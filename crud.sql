INSERT INTO users (username, password)
VALUES ('Admin2025', 'Password12345');

INSERT INTO memes (title, url, user_id)
VALUES ('Distracted Boyfriend', 'https://i.imgur.com/example1.jpg', 1);
Read all memes:
SELECT * FROM memes;
Update a meme:
UPDATE memes SET title = 'Updated Meme' WHERE id = 1;
Delete a meme:
DELETE FROM memes WHERE id = 1;