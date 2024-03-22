import { useEffect, useState } from "react";
import TeamMemberModel from "../../../../Models/TeamMemberModel";
import "./UpdateTeamMember.css";
import teamMembersService from "../../../../Services/TeamMembersService";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Button, ButtonGroup, FormControlLabel, FormLabel, Input, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import notifyService from "../../../../Services/NotifyService";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ClearIcon from '@mui/icons-material/Clear';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CategoryModel from "../../../../Models/CategoryModel";

function UpdateTeamMember(): JSX.Element {

    const { register, handleSubmit, setValue } = useForm<TeamMemberModel>();

    const [ categories, setCategories ] = useState<CategoryModel[]>([]);
    
    const [ selectedImage, setSelectedImage ] = useState(null);

    const params = useParams();

    const navigate = useNavigate();

    // Loads the clicked team member's details, and the categories relevant to team members
    useEffect(() => {

        let teamMemberId = +params.teamMemberId;
        
        teamMembersService.getSpecificTeamMember(teamMemberId)
        .then(async dbTeamMember => {
            setValue("teamMemberId", dbTeamMember.teamMemberId);
            setValue("name", dbTeamMember.name);
            setValue("jobTitle", dbTeamMember.jobTitle);
            setValue("description", dbTeamMember.description);
            setValue("categoryId", dbTeamMember.categoryId);
            await fetchImageAndSetValue(dbTeamMember.imageUrl);
        })
        .catch(err => notifyService.error(err));

        teamMembersService.getAllCategories()
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

    async function sendForm(teamMember: TeamMemberModel) {
        try { 
            await teamMembersService.updateTeamMember(teamMember);
            navigate("/Team");
            notifyService.success("Team Member has been updated successfully")
        }
        catch (err: any) {
           notifyService.error(err); 
        }
    }

    return (

        <div className="UpdateTeamMember FormBox">

            {/* Form main container */}
            <Box component="form"  className="FormContents" onSubmit={handleSubmit(sendForm)}> 

                {/* Form Title */}
                <Typography variant="h5">
                    Update Team Member
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
                <TextField label="Job Title: "
                {...register("jobTitle")}
                type="string"
                inputProps={{
                    minLength: 5, maxLength: 50
                }} 
                required />

                {/* User Input */}
                <TextField label="Description: "
                className="descriptionTextField"
                multiline
                rows={4} 
                {...register("description")}
                type="string"
                inputProps={{
                    minLength: 50, maxLength: 1000
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

export default UpdateTeamMember;
