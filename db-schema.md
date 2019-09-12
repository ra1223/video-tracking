# Database Schema

Considering the application's requirements, we need to have a schema that contains the following tables:

Video Table
```sql
CREATE TABLE VIDEO(
  ID VARCHAR(32),
  NAME VARCHAR(64),
  BRAND VARCHAR(32),
  DATE_PUBLISHED TIMESTAMP
  PRIMARY KEY(ID)
);
```

Video Count Table

```sql
CREATE TABLE VIDEO_COUNT(
  ID VARCHAR(32),
  VIDEO_ID VARCHAR(32),
  DATE_VIEWED TIMESTAMP,
  PRIMARY KEY(ID),
  FOREIGN KEY(VIDEO_ID) REFERENCES VIDEO(VIDEO_ID)
);
```

I imagine that we'd insert a single record once a video has been viewed. To aggregate how many times a video has been seen, we'd perform the following query:

```sql
SELECT 
  COUNT(*)
FROM 
  VIDEO_COUNT
WHERE 
  ID = <VIDEO ID>
```