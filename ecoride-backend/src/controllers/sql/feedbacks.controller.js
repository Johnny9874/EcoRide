import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllFeedback = async (req, res) => {
    try {
        const feedbacks = await prisma.feedback.findMany({
            include: { 
                reservation: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                email: true,
                                pseudo: true
                            }
                        }
                    }
                }
             }
        })
        res.json(feedbacks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getFeedbackById = async (req, res) => {
    try {
        const feedback = await prisma.feedback.findUnique({
            where: { id: req.params.id },
            include: {
                reservation: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                email: true,
                                pseudo: true
                            }
                        }
                    }
                }
            }
        });
        if (!feedback) return res.status(404).json({error: 'Not found'});
        res.json(feedback)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const createFeedback = async (req, res) => {
    try {
        const feedback = await prisma.feedback.create({ data: req.body });
        res.status(201).json(feedback);
    } catch (err) {
        res.status(400).json({ error: err.message });
    } 
}

export const updateFeedback = async (req, res) => { 
    try {
        const updated = await prisma.feedback.update({
            where: { id: req.params.id },
            data: req.body
        });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    } 
}

export const deleteFeedback = async (req, res) => {
    try {  
        await prisma.feedback.delete({ where: { id: req.params.id } });
        res.status(204).end();
    } catch (err) {
        res.status(400).json({ error: err.message });
    } 
}