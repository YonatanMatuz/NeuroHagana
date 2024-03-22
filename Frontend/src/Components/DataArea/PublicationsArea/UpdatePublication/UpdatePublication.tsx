import { useEffect, useState } from "react";
import "./UpdatePublication.css";
import PublicationModel from "../../../../Models/PublicationModel";
import { useForm } from "react-hook-form";
import publicationsService from "../../../../Services/PublicationsService";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, ButtonGroup, Input, TextField, Typography } from "@mui/material";
import notifyService from "../../../../Services/NotifyService";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ClearIcon from '@mui/icons-material/Clear';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import moment from "moment";

function UpdatePublication(): JSX.Element {

    const { register, handleSubmit, setValue } = useForm<PublicationModel>();

    const [ selectedImage, setSelectedImage ] = useState(null);

    const params = useParams();

    const navigate = useNavigate();

    // Loads the clicked publications details
    useEffect(() => {

        let publicationId = +params.publicationId;
        
        publicationsService.getSpecificPublication(publicationId)
        .then(async dbPublication=> {

            const formattedDate = formatDate(dbPublication.date);
            setValue("publicationId", dbPublication.publicationId);
            setValue("title", dbPublication.title);
            setValue("description", dbPublication.description);
            setValue("refUrl", dbPublication.refUrl);
            setValue("date", formattedDate);
            await fetchImageAndSetValue(dbPublication.imageUrl);
        })
        .catch(err => notifyService.error(err));

    }, []);


    function formatDate(date: string) {
        const formattedDate = moment(date).format('YYYY-MM-DD');
        return formattedDate;
    }

    // Backend returns a url and not a image, so with these 2 functions we convert and set the current image as the default image
    async function fetchImageAndSetValue(url: string) {
        try {   
            const file = await urlToFile(url);
            setValue("image", file);
            setSelectedImage(url);
        }
        catch (err: any) {
            notifyService.error('Error fetching image: ' + err);
        }
    }

    async function urlToFile(url: string): Promise<File> {
        const response = await fetch(url);
        const blob = await response.blob();
        const contentType = response.headers.get('content-type');
        return new File([blob], url, { type: contentType });
    }

    function handleImageChange(event: any) {
        
        const file = event.target.files?.[0];
    
        if (file) {
            const reader = new FileReader();
            
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            }
            reader.readAsDataURL(file);
            setValue("image", file);
        }
    }

    async function sendForm(publication: PublicationModel) {
        try {
            await publicationsService.updatePublication(publication);
            navigate("/Publications");
            notifyService.success("Publication has been updated successfully!");
        }
        catch (err: any) {
           notifyService.error(err); 
        }
    }

    return (

        <div className="UpdatePublication FormBox">

            {/* Form main container */}
            <Box component="form"  className="FormContents" onSubmit={handleSubmit(sendForm)}> 

                {/* Form Title */}
                <Typography variant="h5">
                    Update Publication/News Article
                </Typography>

                {/* User Input */}
                <TextField
                label="Title: "
                {...register("title")} 
                type="string"
                inputProps={{ 
                    minLength: 3, maxLength: 40
                }}
                required />

                {/* User Input */}
                <TextField
                label="Description: "
                {...register("description")}
                className="descriptionTextField"
                multiline
                rows={4} 
                type="string"
                inputProps={{ 
                    minLength: 50, maxLength: 800
                }}
                required /> 

                {/* User Input */}
                <TextField
                label="Publication URL: "
                {...register("refUrl")}
                type="string"
                inputProps={{ 
                    minLength: 10
                }}
                required />

                {/* User Input */}
                <TextField type="date" {...register("date")} helperText="DD-MM-YYYY" required>
                    Date: 
                </TextField>


                {/* Adding image button + selected image container */}
                <div className="imageContainer">

                    <label htmlFor="image-input">

                        <Button component="span" variant="contained">
                            Add Image &nbsp; <AddPhotoAlternateIcon />
                        </Button>

                    </label>

                        <div className="selectedImage">

                            <Typography variant="body2"> Selected Image: </Typography>
                            <img src={selectedImage} alt="Selected" />

                        </div>

                    <Input
                    id="image-input"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                    required
                    />
                    
                </div>

                
                {/* Form Buttons */}
                <ButtonGroup fullWidth variant="contained">

                    <Button type="submit" color="success">
                        Submit &nbsp; <ArrowUpwardIcon />
                    </Button>
                    
                    <Button type="reset">
                        Clear &nbsp; <ClearIcon />
                    </Button>

                </ButtonGroup>

            </Box>
                
        </div>
        
    );
}

export default UpdatePublication;
