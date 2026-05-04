import { Container, Breadcrumbs, Anchor } from "@mantine/core";
import { Link } from "react-router-dom";
import MainProfile from "../Profile/MainProfile";
import { IconHome, IconUser, IconBriefcase } from "@tabler/icons-react";

const ProfilePage = () => {
  const items = [
    { title: 'Home', href: '/' },
    { title: 'Profile', href: '#' },
  ].map((item, index) => (
    <Anchor 
      component={Link} 
      to={item.href} 
      key={index}
      className="text-gray-500 hover:text-blue-600 transition-colors text-sm"
    >
      {item.title}
    </Anchor>
  ));

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <Container size="xl" className="py-6 px-4 sm:px-6">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <IconBriefcase size={18} className="text-blue-600" />
            <Breadcrumbs separator="→" className="text-sm">
              {items}
            </Breadcrumbs>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <IconUser size={14} />
            <span>Public Profile</span>
          </div>
        </div>
        
        <hr className="border-gray-200 my-4" />
        
        <MainProfile />
      </Container>
    </div>
  );
};

export default ProfilePage;