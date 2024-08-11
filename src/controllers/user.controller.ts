import { Request, Response } from "express";
import PrayerRequestModel from "../models/prayerRequests.schema";
import GalleryModel from "../models/gallery.schema";
import RelicModel from "../models/relic.schema";
import BannerModel from "../models/banner.schema";
import EventModel from "../models/event.schema";
import ParishMember from "../models/parishMembers.schema";
import RegisterModel from "../models/register.schema";

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
export const fetchRelics = async (req: Request, res: Response) => {
  try {
    const allRelics = await RelicModel.find();
    console.log(allRelics);
    
    res.status(200).json({relics: allRelics});
  } catch (error) {
    console.error('Error fetching relics:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const fetchBanners = async (req: Request, res: Response) => {
  try {
    const allBanners = await BannerModel.find();
    console.log(allBanners);
    
    res.status(200).json({banners: allBanners});
  } catch (error) {
    console.error('Error fetching banners:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const fetchEventById = async (req: Request, res: Response) => {
  try {
    const {eventId} = req.body

    console.log(eventId);
    
    const selectedEvent = await EventModel.findById({_id: eventId});
    res.status(200).json({event: selectedEvent});
  } catch (error) {
    console.error('Error fetching banners:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const fetchParishMembers = async (req: Request, res: Response) => {
  try {
    const members = await ParishMember.find();
    res.status(200).json({members: members});
  } catch (error) {
    console.error('Error fetching banners:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const fetchRegisters = async (req: Request, res: Response) => {
  try {
    const registers = await RegisterModel.find();
    res.status(200).json({registers: registers});
  } catch (error) {
    console.error('Error fetching registers:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
