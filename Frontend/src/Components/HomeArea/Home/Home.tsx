import { Box, Typography } from "@mui/material";
import ourMissionImage from "../../../Assets/Images/DepoPhoto5.jpg";
import ourCompanyImage from "../../../Assets/Images/DepoPhoto4.jpg";
import ourTreatmentImage from "../../../Assets/Images/Showcase.jpg";
import "./Home.css";
import HomeCard from "../HomeCard/HomeCard";

function Home(): JSX.Element {

    return (

        <div className="Home">

            {/* Header image + Title */}
			<Box className="headerBox">

                <div className="headerTitle">

                    <Typography>
                        Preventing Permanent Disabilities
                    </Typography>

                    <Typography>
                        After Trauma
                    </Typography>

                </div>

            </Box>

            <HomeCard 
            header="OUR MISSION"
            title="We will give neurotrauma victims a second chance to regain their freedom"
            description="Our mission is to prevent the permanent disabilities caused by spinal cord injury, traumatic brain injury and stroke. our treatment will dramatically improve the quality of life of victims and their families"
            imageSrc={ourMissionImage}
            />

            <HomeCard 
            header="OUR COMPANY"
            title="Disruptive Innovation"
            description="We are a groundbreaking biotech company, developing and delivering an immediate injectable treatment for neurotrauma, irrespective of its type or severity."
            imageSrc={ourCompanyImage}
            />

            <HomeCard 
            header="OUR TREATMENT"
            title="A unique neuro-protective solution"
            description="The efficacy of the new treatment for the first pathology: Spinal Cord Injury, has been tested in three clinically relevant models in mice at Tel Aviv University with strong therapeutic efficacy  without side effects."
            imageSrc={ourTreatmentImage}
            />

        </div>
    );
}

export default Home;
