import { Navigate, Route, Routes } from "react-router-dom";
import AddInfoTopic from "../../DataArea/InfoTopicsArea/AddInfoTopic/AddInfoTopic";
import UserInfoTopicList from "../../DataArea/InfoTopicsArea/InfoTopicList/InfoTopicList";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import UpdateInfoTopic from "../../DataArea/InfoTopicsArea/UpdateInfoTopic/UpdateInfoTopic";
import UserTeamMemberList from "../../DataArea/AboutUsArea/TeamMemberList/TeamMemberList";
import UpdateTeamMember from "../../DataArea/AboutUsArea/UpdateTeamMember/UpdateTeamMember";
import AddTeamMember from "../../DataArea/AboutUsArea/AddTeamMember/AddTeamMember";
import UserPublicationList from "../../DataArea/PublicationsArea/PublicationList/PublicationList";
import AddPublication from "../../DataArea/PublicationsArea/AddPublication/AddPublication";
import UpdatePublication from "../../DataArea/PublicationsArea/UpdatePublication/UpdatePublication";
import ProofOfConcept from "../../DataArea/InfoTopicsArea/ProofOfConcept/ProofOfConcept";
import ThePlatform from "../../DataArea/AboutUsArea/ThePlatform/ThePlatform";
import Landing from "../Landing/Landing";
import Login from "../../AuthArea/Login/Login";
import AdminRoutes from "../../SharedArea/AdminRoutes";

function Routing(): JSX.Element {

    return (

        <Routes>

            {/* ----------------- None-User / User Routes --------------------*/}

            <Route path="/Landing" element={<Landing />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Login" element={<Login />} />

            {/* Data displaying routes */}
            <Route path="/TheProblem/:categoryId" element={<UserInfoTopicList />} />
            <Route path="/TheSolution/:categoryId" element={<UserInfoTopicList />} />
            <Route path="/SocialImpact/:categoryId" element={<UserInfoTopicList />} />
            <Route path="/ProofOfConcept" element={<ProofOfConcept />} />
            <Route path="/InformationTopics" element={<UserInfoTopicList />} />
            <Route path="/Publications" element={<UserPublicationList />} />
            <Route path="/ThePlatform" element={<ThePlatform />} />
            <Route path="/Team" element={<UserTeamMemberList />} />

            {/* 404 & none specified route */}
            <Route path="/" element={<Navigate to="/Landing" />} />
            <Route path="*" element={<PageNotFound />} />

            {/* -------------------- Admin Routes --------------------------*/}
            {/*----------- Higher Order Component Validation ---------------*/}

            {/* Adding routes */}
            <Route path="/addInfoTopic" element={<AdminRoutes Route={<AddInfoTopic />} />} />
            <Route path="/addTeamMember" element={<AdminRoutes Route={<AddTeamMember />} />} />
            <Route path="/addPublication" element={<AdminRoutes Route={<AddPublication />} />} />

            {/* Updating routes */}
            <Route path="/updateInfoTopic/:infoId" element={<AdminRoutes Route={<UpdateInfoTopic />} />} />
            <Route path="/updateTeamMember/:teamMemberId" element={<AdminRoutes Route={<UpdateTeamMember />} />} />
            <Route path="/updatePublication/:publicationId" element={<AdminRoutes Route={<UpdatePublication />} />} />

        </Routes> 

    );
}

export default Routing;
