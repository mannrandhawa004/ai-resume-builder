import imagekit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";
import fs from 'fs';



export const createResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { title, template } = req.body;
        const newResume = await Resume.create({ userId, title, template })
        // console.log("new resume", newResume)
        return res.status(201).json({ message: 'Resume created successfully', resume: newResume })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

export const deleteResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;
        await Resume.findOneAndDelete({ userId, _id: resumeId })


        return res.status(200).json({ message: 'Resume deleted successfully' })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}



export const getResumeById = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;

        const resume = await Resume.findOne({ userId, _id: resumeId })

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" })
        }

        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;

        return res.status(200).json({ resume })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

export const getPublicResumeById = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const resume = await Resume.findOne({ public: true, _id: resumeId })

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" })
        }

        return res.status(200).json({ resume })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

export const updateResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId, resumeData, removeBackground } = req.body;
        const image = req.file;


        // console.log(`resume data: ${resumeData}`)

        let resumeDataCopy;
        if (typeof resumeData === 'string') {
            resumeDataCopy = JSON.parse(resumeData); 
        } else {
            resumeDataCopy = { ...resumeData };
        }

        if (image) {
            const imageBufferData = fs.createReadStream(image.path);

            const response = await imagekit.files.upload({
                file: imageBufferData,
                fileName: `resume_${resumeId}.png`,
                folder: 'user-resumes',
                transformation: {
                    pre: 'w-300,h-300,fo-face,z-0.75' + (removeBackground === 'yes' ? ',e-bgremove' : '')
                }
            });

            resumeDataCopy.personal_info.image = response.url;

            if (fs.existsSync(image.path)) fs.unlinkSync(image.path);
        }

        const resume = await Resume.findOneAndUpdate(
            { userId, _id: resumeId },
            resumeDataCopy,
            { new: true }
        );


        if (!resume) {
            return res.status(404).json({ message: "Resume not found or unauthorized" });
        }

        return res.status(200).json({ message: 'Saved successfully', resume });

    } catch (error) {
        console.error("Update Error:", error);
        return res.status(400).json({ message: error.message });
    }
}
