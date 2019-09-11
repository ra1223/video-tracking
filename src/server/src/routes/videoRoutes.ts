import { Router, Request, Response } from 'express';
import uuid from 'uuid/v4';
import Video from '../lib/types/video';
import Count from '../lib/types/count';
import { all } from 'q';

const router = Router();

// Simulate data for database
let videoList: Video[] = [];
let videoCount: Map<string, Count[]> = new Map();

router.get('/video', (req: Request, res: Response) => {
  try {
    res.status(200).json({ videoList });
  } catch (e) {
    res.status(500).json({
      error: e
    });
  }
});

router.post('/video', (req: Request, res: Response) => {
  try {
    const { body: { id, name, brand, published_date } } = req;

    const newVideo: Video = {
      id,
      name,
      brand,
      published_date
    };

    const newCount: Count = {
      id,
      count: 0,
      date_viewed: new Date().toDateString()
    }

    videoList.push(newVideo);
    videoCount.set(id, [newCount]);

    res.status(201).json({ id });
  } catch (e) {
    res.status(500).json({
      error: e
    });
  }
});

router.put('/video/view/:video_id', (req: Request, res: Response) => {
  try {
    const { params: { video_id } } = req;
    
    const allCounts: Count[] = videoCount.get(video_id) || [];

    if (allCounts[allCounts.length - 1].date_viewed !== new Date().toDateString()) {
      allCounts.push({ id: video_id, count: 1, date_viewed: new Date().toDateString()});
    } else {
      allCounts[allCounts.length - 1].count++;
    }

    videoCount.set(video_id, allCounts);
    res.status(201).json({ ok: true });
  } catch (e) {
    res.status(500).json({
      error: e
    });
  }
});

router.get('/video/report/:video_id', (req: Request, res: Response) => {
  try {
    const { params: { video_id } } = req;

    let date = '';

    const videoInfo: Video = videoList.find((video): boolean => video.id === video_id) || { id: '', name: '', brand: '', published_date: ''};

    let count = 0;
    const allCounts: Count[] = videoCount.get(video_id) || [];
    allCounts.forEach((singleCount: Count) => {
      if (
        req.query.date && 
        new Date(singleCount.date_viewed) >= new Date(req.query.date)
        ) {
        count = count + singleCount.count
      } 
      
      if (!req.query.published_date) {
        count = count + singleCount.count;
      }
    });

    res.status(200).json({ videoInfo, count });
  } catch (e) {
    res.status(500).json({
      error: e
    });
  }
});

export default router;