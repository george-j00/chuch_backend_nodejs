import { Request, Response } from "express";
import EventModel from "../models/event.schema";
import PrayerRequestModel from "../models/prayerRequests.schema";
import cloudinary from "../services/cloudinary";
import GalleryModel from "../models/gallery.schema";
import RelicModel from "../models/relic.schema";
import BannerModel from "../models/banner.schema";
import ParishMember from "../models/parishMembers.schema";
import AdminModel from "../models/admin.auth.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key"

export const adminLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Missing username or password" });
  }

  try {
    const admin = await AdminModel.findOne({ username: username });

    if (!admin) {
      return res.status(401).json({ message: "Invalid username" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      SECRET_KEY,
      {
        expiresIn: "1h", // Token expires in 1 hour
      }
    );

    return res.status(200).json({ message: "Login successful!", token: token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  const { event } = req.body;

  try {
    // Create a new event instance based on the request body
    const newEvent = new EventModel({
      eventDate: event.eventDate,
      endDate: event.endDate,
      eventTime: event.eventTime,
      endTime: event.endTime,
      eventLocation: event.eventLocation,
      eventTheme: event.eventTheme,
      eventDescription: event.eventDescription,
    });

    await newEvent.save();
    res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    // Handle any errors
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateEventStatus = async (req: Request, res: Response) => {
  const { eventId, status } = req.body;

  try {
    // console.log(eventId, status);

    // Find the event by ID and update its status
    const updatedEvent = await EventModel.findByIdAndUpdate(
      eventId,
      { status: status },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      message: "Event status updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    // Handle any errors
    console.error("Error updating event status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getEvents = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    // Query the database to get all events
    let events = {};
    if (status === "All") {
      events = await EventModel.find().sort({ createdAt: -1 });
    } else {
      events = await EventModel.find({ status: status }).sort({
        createdAt: -1,
      });
    }
    // Respond with the retrieved events
    res.status(200).json({ events });
  } catch (error) {
    // Handle any errors
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.eventId;
    // delete the event with the specified eventId
    await EventModel.findByIdAndDelete(eventId);

    // Respond with the retrieved events
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    // Handle any errors
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteMember = async (req: Request, res: Response) => {
  try {
    const memberId = req.params.memberId;
    // delete the event with the specified eventId
    await ParishMember.findByIdAndDelete(memberId);
    
    // Respond with the retrieved events
    res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    // Handle any errors
    console.error("Error deleting member:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addEventImages = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.body;
    const files = req.files as Express.Multer.File[];

    if (!eventId || !files || files.length === 0) {
      return res
        .status(400)
        .json({ message: "Event ID and images are required" });
    }

    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path);
        return result?.secure_url;
      })
    );

    const event = await EventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.imageUrls = uploadedImages;
    await event.save();

    res.status(200).json({ message: "Images added successfully", event });
  } catch (error) {
    console.error("Error adding image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllPrayerRequests = async (req: Request, res: Response) => {
  try {
    const allPrayerRequests = await PrayerRequestModel.find().sort({
      createdAt: -1,
    });
    // Respond with the retrieved events
    res.status(200).json({ prayerRequests: allPrayerRequests });
  } catch (error) {
    // Handle any errors
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const addImage = async (req: Request, res: Response) => {
  try {
    const { imageTitle } = req.body;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      const imageUrl = result.secure_url;

      const newImage = new GalleryModel({
        imageTitle: imageTitle,
        imageUrl: imageUrl,
      });

      console.log(newImage);

      await newImage.save();

      res.status(200).json({ message: "Image added successfully" });
    } else {
      res.status(400).json({ message: "No image file provided" });
    }
  } catch (error) {
    console.error("Error adding image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const addRelics = async (req: Request, res: Response) => {
  try {
    const { description } = req.body;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      const imageUrl = result.secure_url;

      const newRelic = new RelicModel({
        description: description,
        imageUrl: imageUrl,
      });

      console.log(newRelic);

      await newRelic.save();

      res.status(200).json({ message: "Relics added successfully" });
    } else {
      res.status(400).json({ message: "No image file provided" });
    }
  } catch (error) {
    console.error("Error adding image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deletePrayerRequest = async (req: Request, res: Response) => {
  try {
    const prayerRequestId = req.params.prayerRequestId;
    // delete the event with the specified eventId
    await PrayerRequestModel.findByIdAndDelete(prayerRequestId);
    // Respond with the retrieved events
    res.status(200).json({ message: "Prayer request deleted successfully" });
  } catch (error) {
    // Handle any errors
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const addBanner = async (req: Request, res: Response) => {
  try {
    const { quote, author } = req.body;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      const imageUrl = result.secure_url;

      const newBanner = new BannerModel({
        quote: quote,
        author: author,
        imageUrl: imageUrl,
      });

      console.log("new Banner ", newBanner);

      await newBanner.save();

      res.status(200).json({ message: "Banner added successfully" });
    } else {
      res.status(400).json({ message: "No image file provided" });
    }
  } catch (error) {
    console.error("Error adding banner:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addParishMember = async (req: Request, res: Response) => {
  try {
    const { name, houseName, category } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "Image file is required" });
    }
    let imageUrl = "";
    // Assuming the image file is stored as a Base64 string
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const newParishMember = new ParishMember({
      name,
      houseName,
      image: imageUrl,
      category,
    });

    await newParishMember.save();

    res.status(201).json({ message: "Parish member added successfully" });
  } catch (error) {
    console.error("Error adding parish member:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getParishMembersList = async (req: Request, res: Response) => {
  try {

    const parishMembersLis = await  ParishMember.find();  
    res.status(201).json({ memebersList: parishMembersLis });
  } catch (error) {
    console.error("Error adding parish member:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
