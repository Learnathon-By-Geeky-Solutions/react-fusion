import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getSingleCourse from "@/src/services/singleCourse";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function LecturePage() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        async function fetchCourse() {
            try {
                const response = await getSingleCourse(id);
                if (response.success) {
                    setCourse(response.data);
                    // Default first video selection
                    const firstMilestone = response.data.milestones?.[0];
                    const firstModule = firstMilestone?.modules?.[0];
                    const firstVideo = firstModule?.videos?.[0];

                    if (firstVideo) {
                        setSelectedVideo({
                            ...firstVideo,
                            milestoneNumber: 1,
                            moduleNumber: 1,
                            videoNumber: 1,
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching course details:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchCourse();
    }, [id]);

    if (loading) return <p className="text-center text-lg">Loading lecture...</p>;
    if (!course) return <p className="text-center text-red-500">Course not found.</p>;

    return (
        <div className="max-w-[1280px] mx-auto py-8 grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Left Side - Video & Notes */}
            <div className="md:col-span-2">
                {selectedVideo && (
                    <>
                        {/* Video Title */}
                        <h1 className="text-2xl font-bold mb-4">
                            {selectedVideo.milestoneNumber}.{selectedVideo.moduleNumber}.{selectedVideo.videoNumber} - {selectedVideo.title}
                        </h1>

                        {/* Video Player */}
                        <div className="w-full h-64 md:h-96 bg-black rounded-lg flex items-center justify-center text-white">
                            <a href={selectedVideo.url} target="_blank" rel="noopener noreferrer">
                                Watch Video
                            </a>
                        </div>

                        {/* Like & Dislike Buttons */}
                        <div className="mt-4 flex items-center space-x-4">
                            <button className="bg-gray-200 px-4 py-2 rounded-lg">
                                👍 {selectedVideo.likeCount}
                            </button>
                            <button className="bg-gray-200 px-4 py-2 rounded-lg">
                                👎 {selectedVideo.dislikeCount}
                            </button>
                        </div>

                        {/* Notes Section */}
                        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                            <h2 className="text-lg font-semibold">Notes</h2>
                            <p className="text-gray-700 mt-2">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce convallis.
                            </p>
                            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
                                Edit Notes
                            </button>
                        </div>

                        {/* Comments Section */}
                        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold text-gray-800 mb-3">Comments</h2>
                            <div className="mt-2 space-y-3">
                                <div className="bg-white p-4 rounded-lg shadow flex items-start">
                                    <span className="font-medium text-gray-900">User1:</span>
                                    <p className="ml-2 text-gray-700">Great video!</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow flex items-start">
                                    <span className="font-medium text-gray-900">User2:</span>
                                    <p className="ml-2 text-gray-700">Thanks for explaining!</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Right Sidebar - Course Navigation */}
            <div className="md:col-span-1 bg-gray-100 p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-3 text-black">Course Content</h2>
                <Accordion type="single" collapsible>
                    {course.milestones.map((milestone, mIndex) => (
                        <AccordionItem key={milestone.id} value={milestone.id} className="mb-2">
                            <AccordionTrigger className="font-medium text-black px-2 py-2 bg-gray-300 rounded-md w-full text-left">
                                {milestone.title}
                            </AccordionTrigger>
                            <AccordionContent>
                                {milestone.modules.map((module, modIndex) => (
                                    <Accordion type="single" collapsible key={module.id}>
                                        <AccordionItem value={module.id} className="bg-gray-200 rounded-md pb-2">
                                            <AccordionTrigger className="text-[14px] font-medium text-gray-800 px-4 py-2 w-full text-left">
                                                {module.title}
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                {module.videos.map((video, vIndex) => (
                                                    <button
                                                        key={video.id}
                                                        onClick={() =>
                                                            setSelectedVideo({
                                                                ...video,
                                                                milestoneNumber: mIndex + 1,
                                                                moduleNumber: modIndex + 1,
                                                                videoNumber: vIndex + 1,
                                                            })
                                                        }
                                                        className={`block w-full text-left text-sm px-6 py-2 mx-4 rounded-md ${selectedVideo?.id === video.id
                                                                ? "bg-blue-500 text-white"
                                                                : "bg-gray-50 hover:bg-blue-100"
                                                            }`}
                                                    >
                                                        {mIndex + 1}.{modIndex + 1}.{vIndex + 1} - {video.title}
                                                    </button>
                                                ))}
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

        </div>
    );
}
