import { Box, Button, ButtonGroup, FormControlLabel, FormLabel, Input, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import "./AddInfoTopic.css";
import InfoTopicModel from "../../../../Models/InfoTopicModel";
import { useForm } from "react-hook-form";
import infoTopicsService from "../../../../Services/InfoTopicsService";
import notifyService from "../../../../Services/NotifyService";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ClearIcon from '@mui/icons-material/Clear';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useEffect, useState } from "react";
import CategoryModel from "../../../../Models/CategoryModel";
import { useNavigate } from "react-router-dom";

function AddInfoTopic(): JSX.Element {

    const { register, handleSubmit, setValue } = useForm<InfoTopicModel>();

    const [ categories, setCategories ] = useState<CategoryModel[]>([]);

    const [ selectedImage, setSelectedImage ] = useState(null);

    const navigate = useNavigate();

    // Loads categories on mount
    useEffect(() => {

        infoTopicsService.getAllCategories()
        .then(dbCategories => {
            setCategories(dbCategories);
        })
        .catch(err => notifyService.error(err));

    }, [])

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
            console.log(infoTopic.categoryId);
            await infoTopicsService.addInfoTopic(infoTopic);
            navigate("/Home"); 
            notifyService.success("Information Topic added successfully!");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }


    return (

        <div className="AddInfoTopic FormBox">

            {/* Form main container */}
            <Box component="form"  className="FormContents" onSubmit={handleSubmit(sendForm)}> 

                {/* Form Title */}
                <Typography variant="h5">
                    Add a new Information Topic
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
                
                <FormLabel>
                    Category
                </FormLabel>

                {/* Radio of relevant categories */}
                <RadioGroup row>
                    {categories.length > 0 && 
                        <>
                            {categories.map(c => 

                                <FormControlLabel
                                label={c.category}
                                {...register("categoryId")}
                                key={c.categoryId}
                                value={c.categoryId}
                                control={<Radio />} 
                                required
                                />

                            )}
                        </>
                    }
                </RadioGroup>

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

                            <Typography variant="body2"> Selected Image: </Typography>
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

export default AddInfoTopic;
