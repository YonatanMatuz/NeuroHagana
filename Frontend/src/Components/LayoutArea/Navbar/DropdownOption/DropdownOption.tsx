import { Button, Menu, MenuItem, Typography } from "@mui/material";
import "./DropdownOption.css";
import { NavLink } from "react-router-dom";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import CategoryModel from "../../../../Models/CategoryModel";

// This component is made to create a responsive dropdown specifically for information topics

interface DropdownOptionProps {
    label: string;
    categories: CategoryModel[];
}

function DropdownOption(props: DropdownOptionProps): JSX.Element {

    // This is case a category has a space between the words
    function filterSpaces(category: string): string {
        return category.replace(/\s/g, '');
    }

  return (

    <div className="DropdownOption">

        <PopupState variant="popover" popupId="demo-popup-menu">

            {(popupState) => (

                <>
                    {/* Label */}
                    <Button size="large" {...bindTrigger(popupState)}>
                        {props.label}
                    </Button>

                    {/* Maps the categories passed from parent*/}
                    <Menu {...bindMenu(popupState)}>

                        {props.categories.map(c => 

                            <MenuItem onClick={popupState.close} key={c.categoryId}>

                                <NavLink to={`/${filterSpaces(c.category)}/${c.categoryId}`}>

                                    <Typography>
                                        {c.category}
                                    </Typography>

                                </NavLink>

                            </MenuItem>
                            
                        )}

                        <MenuItem onClick={popupState.close}>

                            <NavLink to="/ProofOfConcept">

                                <Typography>
                                    Proof of Concept
                                </Typography>

                            </NavLink>

                        </MenuItem>


                    </Menu>
                </>
                
            )}

        </PopupState>

    </div>

  );

}

export default DropdownOption;
