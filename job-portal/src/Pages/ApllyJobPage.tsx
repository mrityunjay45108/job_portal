import { Button, Breadcrumbs, Anchor, Container, Title, Text } from "@mantine/core";
import { IconArrowLeft, IconHome, IconBriefcase, IconHelpCircle, IconFileCheck } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import ApplyJobComp from "../ApplyJob/ApplyJobComp";

const ApplyJobPage = () => {
  const breadcrumbItems = [
    { title: 'Home', href: '/' },
    { title: 'Browse Jobs', href: '/jobs' },
    { title: 'Application Form', href: '#' },
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <Container size="lg" className="py-12 px-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
              <IconFileCheck size={28} className="text-white" />
            </div>
            <div>
              <Title order={1} className="text-3xl md:text-4xl font-bold text-white">
                Submit Your Application
              </Title>
              <Text className="text-blue-100 mt-1">
                Complete the form below to apply for your dream position
              </Text>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-blue-100 mt-4">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Application takes ~10 minutes</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span>All fields marked with * are required</span>
            </div>
          </div>
        </Container>
      </div>

      <Container size="lg" className="py-8 px-6">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Breadcrumbs separator="→" className="text-sm">
            {breadcrumbItems}
          </Breadcrumbs>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Link to="/jobs">
            <Button
              variant="light"
              color="blue"
              size="sm"
              leftSection={<IconArrowLeft size={18} />}
              className="hover:bg-blue-50 transition-all hover:translate-x-[-2px]"
            >
              Back to Job Search
            </Button>
          </Link>
        </div>

        {/* Application Form */}
        <ApplyJobComp />

        {/* Help Section */}
        <div className="mt-10 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <IconHelpCircle size={24} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900 mb-1">Need Assistance?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Our recruitment team is here to help you with any questions about the application process.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" color="blue" size="sm" className="border-blue-300">
                  📚 View FAQ
                </Button>
                <Button variant="light" color="blue" size="sm">
                  💬 Live Chat Support
                </Button>
                <Button variant="subtle" color="blue" size="sm">
                  📧 Email Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ApplyJobPage;