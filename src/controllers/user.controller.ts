import { Request, Response } from "express";
import EventModel from "../models/event.schema";
import PrayerRequestModel from "../models/prayerRequests.schema";
import GalleryModel from "../models/gallery.schema";

export const createPrayerRequest = async (req: Request, res: Response) => {
  const { prayerRequest } = req.body;

  try {
    console.log(prayerRequest);

    // Create a new event instance based on the request body
    const newRequest = new PrayerRequestModel({
      name: prayerRequest.name,
      phoneNumber: prayerRequest?.phoneNumber,
      place: prayerRequest?.place,
      requestType: prayerRequest?.requestType,
      specialPrayer: prayerRequest?.specialPrayer,
      amount: prayerRequest.amount,
    });

    // Save the new event to the database
    await newRequest.save();

    // Respond with success message
    res.status(201).json({
      message: "Prayer Request created successfully",
      prayerRequest: newRequest,
    });
  } catch (error) {
    // Handle any errors
    console.error("Error creating prayer request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getAllImages = async (req: Request, res: Response) => {
  try {
    const images = await GalleryModel.find();
    console.log(images);
    
    res.status(200).json({images: images});
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
