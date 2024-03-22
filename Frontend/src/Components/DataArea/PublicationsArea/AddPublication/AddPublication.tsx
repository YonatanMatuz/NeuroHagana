import { useForm } from "react-hook-form";
import "./AddPublication.css";
import PublicationModel from "../../../../Models/PublicationModel";
import { Box, Button, ButtonGroup, Input, TextField, Typography } from "@mui/material";
import notifyService from "../../../../Services/NotifyService";
import publicationsService from "../../../../Services/PublicationsService";
import { useState } from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ClearIcon from '@mui/icons-material/Clear';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useNavigate } from "react-router-dom";

function AddPublication(): JSX.Element {

    const { register, handleSubmit, setValue } = useForm<PublicationModel>();

    const [ selectedImage, setSelectedImage ] = useState(null);

    const navigate = useNavigate();

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
            await publicationsService.addPublication(publication);
            navigate('/home');
            notifyService.success("Publication added successfully!"); 

        }
        catch (err: any) {
            notifyService.error(err);
        }
    }


    return (

        <div className="AddPublication FormBox">

            {/* Form main container */}
            <Box component="form"  className="FormContents" onSubmit={handleSubmit(sendForm)}> 

                {/* Form Title */}
                <Typography variant="h5">
                    Add a new Publication
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
                    
                    {/* User selected image displayed */}
                    {selectedImage && 

                        <div className="selectedImage">

                            <Typography variant="body2">
                                Selected Image:
                            </Typography>

                            <img src={selectedImage} alt="Selected" />

                        </div>
                    }

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

export default AddPublication;
