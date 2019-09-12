# API

## Get all video

Description: Get all videos thar have been uploaded.

Endpoint:

```text
GET http://<base url>/api/video
```

Request: None

Response:
```json
// Valid response 200
{
  "videoList": [
    {
      "id": "<id of video>",
      "name": "<name of video>",
      "brand": "<brand which video belongs to>",
      "published_date": "<date that video was published>"
    },
    {
      ... // More video objects
    }
  ]
}

// Invalid response 500
{
  "error": "<error message>"
}
```

### Upload one video

Description: Upload one video.

Endpoint:

```text
POST https://<base url>/api/video
```

Request

```json
// Body
// Required
{
  "name": "<name of video>",
  "brand": "<brand which video belongs to>"
}
```

Response

```json
// Valid response 201
{
  "id": "<id of video>"
}

// Invalid response 500
{
  "error": "<error message>"
}
```

### Add one view to video

Description: Add one view to an existing video.

Endpoint:

```text
PUT http://<base url>/api/video/view/:video_id
```

Request

```json
// Params
// Required
"video_id": "<id of video>" 
```

Response

```json
// Valid response 201
{
  "ok": true
}

// Invalid response 500

{
  "error": "<error message>"
}
```

### Get video report

Description: Get data about a single video which includes how many times it has been viewed. If `date` provided by user, it can provide views of a video start from that day until the most recent time that it has been viewed.

Endpoint:

```text
GET http://<base url>/api/video/report/:video_id?date=<date>
```

Request

```json
// Params
// Required
"video_id": "<id of video>"

// Query
"date": "<date to offset view count>"
```

Response

```json
{
  "videoInfo": {
    "id": "<id of video>",
    "name": "<name of video>",
    "brand": "<brand which video belongs to>",
    "published_date": "<date that video was published>"
  },
  "count": "<number of times video was viewed>"
}
```