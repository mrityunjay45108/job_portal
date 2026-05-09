import {
  IconAward,
  IconCalendar,
  IconId,
  IconExternalLink,
  IconCheck,
  IconCertificate,
} from "@tabler/icons-react";
import { Badge, Button, Tooltip } from "@mantine/core";

interface CertificationProps {
  name?: string;
  issuer?: string;
  date?: string;
  issueDate?: string;
  id?: string;
  credentialUrl?: string;
  issuerIcon?: string;
  verified?: boolean;
  expires?: string;
}

const Certification = (props: CertificationProps) => {
  const issueDate = props.date || props.issueDate;
  const isExpired = props.expires
    ? new Date(props.expires) < new Date()
    : false;

  return (
    <div className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:border-blue-200">
      <div className="flex flex-wrap justify-between items-start gap-4">
        {/* Left Section */}
        <div className="flex gap-3 flex-1">
          {/* Logo Container */}
          <div className="p-2.5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300">
            <img
              className="h-8 w-8 object-contain"
              src={
                props.issuerIcon || `/Icons/${props.issuer?.toLowerCase()}.png`
              }
              alt={props.issuer}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/Icons/default-cert.png";
              }}
            />
          </div>

          {/* Details */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {props.name || "Certification Name"}
              </h4>
              {props.verified && (
                <Tooltip label="Verified Certification">
                  <Badge
                    size="xs"
                    color="green"
                    className="bg-green-100 text-green-700"
                  >
                    <IconCheck size={10} className="inline mr-0.5" />
                    Verified
                  </Badge>
                </Tooltip>
              )}
              {isExpired && (
                <Badge
                  size="xs"
                  color="red"
                  className="bg-red-100 text-red-700"
                >
                  Expired
                </Badge>
              )}
            </div>
            <div className="text-sm text-gray-500 font-medium mb-2">
              {props.issuer || "Issuing Organization"}
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-gray-400">
              {issueDate && (
                <div className="flex items-center gap-1">
                  <IconCalendar size={12} />
                  <span>Issued: {issueDate}</span>
                </div>
              )}
              {props.expires && !isExpired && (
                <div className="flex items-center gap-1">
                  <IconCalendar size={12} />
                  <span>Expires: {props.expires}</span>
                </div>
              )}
              {props.id && (
                <div className="flex items-center gap-1">
                  <IconId size={12} />
                  <span>Credential ID: {props.id}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Section - Link */}
        {props.credentialUrl && (
          <Tooltip label="View Credential">
            <a
              href={props.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="subtle"
                size="compact-sm"
                color="blue"
                rightSection={<IconExternalLink size={14} />}
                className="hover:bg-blue-50 transition-all duration-300"
              >
                Verify
              </Button>
            </a>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default Certification;
