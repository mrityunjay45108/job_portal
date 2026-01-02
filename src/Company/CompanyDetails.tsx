import { Avatar, Rating, Badge, Button } from "@mantine/core";
import { IconBookmark } from "@tabler/icons-react";

// Types define karein taaki errors hat jayein
interface ReviewProps { name: string; date: string; rating: number; comment: string; }
interface StatProps { label: string; value: string; }
interface JobProps { title: string; location: string; type: string; salary: string; posted: string; }

export const StatCard = ({ label, value }: StatProps) => (
    <div className="bg-mine-shaft-900 p-5 rounded-2xl border border-mine-shaft-800 text-center hover:border-bright-sun-400 transition-colors shadow-sm">
        <p className="text-xs uppercase tracking-widest text-mine-shaft-400 mb-1">{label}</p>
        <p className="text-xl font-bold text-bright-sun-400">{value}</p>
    </div>
);

export const ReviewCard = ({ name, date, rating, comment }: ReviewProps) => (
    <div className="bg-mine-shaft-900/60 p-6 rounded-2xl border border-mine-shaft-800 mb-4">
        <div className="flex justify-between items-start mb-4">
            <div className="flex gap-3">
                <Avatar color="brightSun.4" radius="xl">{name[0]}</Avatar>
                <div>
                    <p className="font-bold text-white">{name}</p>
                    <p className="text-xs text-mine-shaft-400">{date}</p>
                </div>
            </div>
            <Rating value={rating} readOnly size="xs" />
        </div>
        <p className="text-mine-shaft-300 italic text-sm">"{comment}"</p>
    </div>
);

export const CompanyJobCard = ({ job }: { job: JobProps }) => (
    <div className="bg-mine-shaft-900/40 p-5 rounded-2xl border border-mine-shaft-800 flex justify-between items-center hover:border-bright-sun-400 transition-all">
        <div className="space-y-2">
            <h4 className="font-semibold text-lg text-white">{job.title}</h4>
            <div className="flex gap-3 items-center text-sm text-mine-shaft-400">
                <span>{job.location}</span>
                <Badge color="brightSun.4" variant="outline" size="sm">{job.type}</Badge>
                <span className="text-bright-sun-400 font-bold">{job.salary}</span>
            </div>
        </div>
        <div className="flex gap-3">
            <IconBookmark className="text-mine-shaft-400 cursor-pointer hover:text-bright-sun-400" />
            <Button variant="light" color="brightSun.4" size="sm" radius="md">Apply</Button>
        </div>
    </div>
);