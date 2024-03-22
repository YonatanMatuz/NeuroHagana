import { Box, Button, ButtonGroup, FormControlLabel, FormLabel, Input, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import "./AddTeamMember.css";
import { useForm } from "react-hook-form";
import TeamMemberModel from "../../../../Models/TeamMemberModel";
import notifyService from "../../../../Services/NotifyService";
import teamMembersService from "../../../../Services/TeamMembersService";
import { useEffect, useState } from "react";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ClearIcon from '@mui/icons-material/Clear';
import CategoryModel from "../../../../Models/CategoryModel";
import { useNavigate } from "react-router-dom";

function AddTeamMember(): JSX.Element {

    const { register, handleSubmit, setValue } = useForm<TeamMemberModel>();

    const [ categories, setCategories ] = useState<CategoryModel[]>([]);

    const [ selectedImage, setSelectedImage ] = useState(null);

    const navigate = useNavigate();

    // Loads categories on mount
    useEffect(() => {
        
        teamMembersService.getAllCategories()
        .then(dbCategories => {
            setCategories(dbCategories);
        })
        .catch(err => notifyService.error(err));

    }, []);

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

    async function sendForm(teamMember: TeamMemberModel) {
        try {
            await teamMembersService.addTeamMember(teamMember);
            navigate("/Team");
            notifyService.success("New team member added successfully!"); 
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }


    return (

        <div className="AddTeamMember FormBox">

            {/* Form main container */}
            <Box component="form"  className="FormContents" onSubmit={handleSubmit(sendForm)}> 

                {/* Form Title */}
                <Typography variant="h5">
                    Add a new Team Member
                </Typography>

                {/* User Input */}
                <TextField
                label="Name: "
                {...register("name")}
                type="string"
                inputProps={{
                    minLength: 6, maxLength: 50
                }} 
                required />

                {/* User Input */}
                <TextField
                label="Job Title: "
                {...register("jobTitle")}
                type="string"
                inputProps={{
                    minLength: 5, maxLength: 50
                }} 
                required />

                {/* User Input */}
                <TextField
                label="Description: "
                className="descriptionTextField"
                multiline
                rows={4} 
                {...register("description")}
                type="string"
                inputProps={{
                    minLength: 50, maxLength: 1000
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
                                key={c.categoryId}
                                value={c.categoryId}
                                label={c.category}
                                {...register("categoryId")}
                                control={<Radio />}
                                required />
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

export default AddTeamMember;
