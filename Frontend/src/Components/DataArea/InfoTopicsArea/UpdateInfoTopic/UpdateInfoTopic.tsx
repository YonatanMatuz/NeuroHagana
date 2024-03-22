import { useEffect, useState } from "react";
import InfoTopicModel from "../../../../Models/InfoTopicModel";
import "./UpdateInfoTopic.css";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import infoTopicsService from "../../../../Services/InfoTopicsService";
import notifyService from "../../../../Services/NotifyService";
import { Box, Button, ButtonGroup, FormControlLabel, FormLabel, Input, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ClearIcon from '@mui/icons-material/Clear';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CategoryModel from "../../../../Models/CategoryModel";

function UpdateInfoTopic(): JSX.Element {

    const { register, handleSubmit, setValue } = useForm<InfoTopicModel>();

    const [ categories, setCategories ] = useState<CategoryModel[]>([]);
    
    const [ selectedImage, setSelectedImage ] = useState(null);

    const params = useParams();

    const navigate = useNavigate();

    // Loads the clicked Info topic's details, and the categories relevant to information topics
    useEffect(() => {

        let infoId = +params.infoId;
        
        infoTopicsService.getSpecificInfoTopic(infoId)
        .then(async dbInfoTopic => {
            setValue("infoId", dbInfoTopic.infoId);
            setValue("title", dbInfoTopic.title);
            setValue("description", dbInfoTopic.description);
            setValue("categoryId", dbInfoTopic.categoryId);
            await fetchImageAndSetValue(dbInfoTopic.imageUrl);
        })
        .catch(err => notifyService.error(err));

        infoTopicsService.getAllCategories()
        .then(dbCategories => {
            setCategories(dbCategories);
        })
        .catch(err => notifyService.error(err));

    }, []);

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

    async function sendForm(infoTopic: InfoTopicModel) {
        try {
            await infoTopicsService.updateInfoTopic(infoTopic);
            navigate("/Home");
            notifyService.success("The information topic has been updated successfully");
        }
        catch (err: any) {
           notifyService.error(err); 
        }
    }

    return (

        <div className="UpdateInfoTopic FormBox">

            {/* Form main container */}
            <Box component="form"  className="FormContents" onSubmit={handleSubmit(sendForm)}> 

                {/* Form Title */}
                <Typography variant="h5">
                    Update Information Topic
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

                {/* Loads a radio for each category */}
                {categories.length > 0 && 
                    <>
                        <FormLabel>Category</FormLabel>

                        <RadioGroup>

                            {categories.map(c => 

                                <FormControlLabel
                                key={c.categoryId}
                                value={c.categoryId}
                                control={<Radio />}
                                label={c.category}
                                {...register("categoryId")}
                                required
                                />

                            )}
                            
                        </RadioGroup>
                    </>
                }


                {/* Adding image button + selected image container */}
                <div className="imageContainer">

                    <label htmlFor="image-input">

                        <Button component="span" variant="contained">
                            Add Image &nbsp; <AddPhotoAlternateIcon />
                        </Button>

                    </label>

                        <div className="selectedImage">

                            <Typography variant="body2"> 
                                Selected Image:
                            </Typography>

                            <img src={selectedImage} alt="Selected" />

                        </div>

                    <Input
                    id="image-input"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
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

export default UpdateInfoTopic;
