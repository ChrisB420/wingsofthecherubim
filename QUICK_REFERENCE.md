# 🔍 QUICK REFERENCE - API COMMANDS & DATABASE QUERIES
## Copy & Paste Commands for Your Divine Platform

---

## 🔐 AUTHENTICATION

### Login (Get JWT Token)
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"admin@wingsofthecherubim.quest",
    "password":"ChangeMe123!Secure"
  }'

# Response:
# {
#   "success": true,
#   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
#   "user": {
#     "id": 1,
#     "name": "Divine Administrator",
#     "email": "admin@wingsofthecherubim.quest",
#     "role": "admin"
#   }
# }

# Save this token for all other requests!
# Example: export TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Register New User
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John Believer",
    "email":"john@example.com",
    "password":"SecurePassword123!"
  }'
```

---

## 📖 PROPHETIC INSIGHTS (CMS with Version Control)

### Create New Insight (Admin Only)
```bash
TOKEN="your_jwt_token"

curl -X POST http://localhost:8000/api/insights/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title":"Wings of the Cherubim - The Return",
    "content":"The Menorah is the picture of the symbol of the nation of Israel...",
    "category":"Prophecy",
    "biblical_references":"Revelation 11:15, Zechariah 4:1-14, Isaiah 6:1-8",
    "status":"draft"
  }'

# Response:
# {
#   "success": true,
#   "insight_id": 1,
#   "version": 1,
#   "message": "Insight created successfully"
# }
```

### Update Insight (Creates New Version - NO OMISSIONS)
```bash
TOKEN="your_jwt_token"

curl -X PUT http://localhost:8000/api/insights/update/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title":"Wings of the Cherubim - The Return (Updated)",
    "content":"The Menorah is the picture of the symbol of the nation of Israel... [EXTENDED REVELATION]",
    "biblical_references":"Revelation 11:15, Zechariah 4:1-14, Isaiah 6:1-8, Ezekiel 1:6"
  }'

# Note: Previous version is PRESERVED (Version 1)
# This creates Version 2
# All versions accessible in database for full history
```

### Publish Insight
```bash
TOKEN="your_jwt_token"

curl -X PUT http://localhost:8000/api/insights/publish/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{}'

# Response:
# {
#   "success": true,
#   "message": "Insight published successfully",
#   "public_url": "https://wingsofthecherubim.quest/insights/1"
# }
```

### List All Published Insights
```bash
curl -X GET http://localhost:8000/api/insights/list \
  -H "Content-Type: application/json"

# Response:
# {
#   "success": true,
#   "insights": [
#     {
#       "id": 1,
#       "title": "Wings of the Cherubim",
#       "category": "Prophecy",
#       "status": "published",
#       "version": 2,
#       "created_at": "2026-05-03T10:00:00Z",
#       "published_at": "2026-05-03T10:15:00Z"
#     }
#   ]
# }
```

### View Complete Version History (NO OMISSIONS)
```bash
curl -X GET http://localhost:8000/api/insights/versions/1 \
  -H "Content-Type: application/json"

# Response:
# {
#   "success": true,
#   "insight_id": 1,
#   "versions": [
#     {
#       "version": 1,
#       "title": "Wings of the Cherubim - The Return",
#       "content": "[ORIGINAL FULL CONTENT]",
#       "created_at": "2026-05-03T10:00:00Z",
#       "created_by": "admin"
#     },
#     {
#       "version": 2,
#       "title": "Wings of the Cherubim - The Return (Updated)",
#       "content": "[UPDATED FULL CONTENT WITH MORE REVELATION]",
#       "created_at": "2026-05-03T10:15:00Z",
#       "created_by": "admin"
#     }
#   ]
# }
```

### Search Insights
```bash
curl -X GET "http://localhost:8000/api/insights/search?q=cherubim" \
  -H "Content-Type: application/json"

# Or search by category
curl -X GET "http://localhost:8000/api/insights/search?category=Prophecy" \
  -H "Content-Type: application/json"
```

---

## 🎥 ZOOM MEETINGS

### Schedule Zoom Meeting
```bash
TOKEN="your_jwt_token"

curl -X POST http://localhost:8000/api/zoom/schedule \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "topic":"Prophetic Revelation Meetup - Wings of the Cherubim",
    "description":"Join us for divine revelation and spiritual growth",
    "scheduled_at":"2026-05-10 19:00:00",
    "duration":60,
    "timezone":"America/New_York",
    "enable_recording":true
  }'

# Response:
# {
#   "success": true,
#   "meeting_id": "123456789",
#   "host_id": "abc123def456",
#   "join_url": "https://zoom.us/j/123456789",
#   "start_url": "https://zoom.us/s/123456789",
#   "participant_join_url": "https://zoom.us/j/123456789"
# }
```

### List Scheduled Meetings
```bash
TOKEN="your_jwt_token"

curl -X GET http://localhost:8000/api/zoom/meetings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN"

# Response:
# {
#   "success": true,
#   "meetings": [
#     {
#       "id": 1,
#       "meeting_id": "123456789",
#       "topic": "Prophetic Revelation Meetup",
#       "scheduled_at": "2026-05-10T19:00:00Z",
#       "duration": 60,
#       "participants_count": 45
#     }
#   ]
# }
```

### Get Meeting Details & Recording
```bash
TOKEN="your_jwt_token"

curl -X GET http://localhost:8000/api/zoom/meetings/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN"

# Response includes:
# - Meeting details
# - Join URL
# - Recording status
# - Participant attendance
# - Meeting recording download link
```

### Update Meeting
```bash
TOKEN="your_jwt_token"

curl -X PUT http://localhost:8000/api/zoom/meetings/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "topic":"Updated: Prophetic Revelation Part 2",
    "scheduled_at":"2026-05-17 19:00:00"
  }'
```

### Delete/Cancel Meeting
```bash
TOKEN="your_jwt_token"

curl -X DELETE http://localhost:8000/api/zoom/meetings/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN"
```

---

## 📧 EMAIL CAMPAIGNS

### Create Email Campaign
```bash
TOKEN="your_jwt_token"

curl -X POST http://localhost:8000/api/email/campaign/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name":"Weekly Prophetic Revelation",
    "subject":"This Week\'s Divine Insight - Wings of the Cherubim",
    "from_name":"Wings of the Cherubim",
    "html_content":"<h1>Prophetic Revelation</h1><p>This week we explore...</p>",
    "text_content":"Prophetic Revelation\n\nThis week we explore...",
    "recipient_list":["user1@example.com", "user2@example.com"],
    "scheduled_at":"2026-05-05 10:00:00"
  }'

# Response:
# {
#   "success": true,
#   "campaign_id": 1,
#   "recipients_count": 2,
#   "scheduled_at": "2026-05-05T10:00:00Z"
# }
```

### Get Campaign List
```bash
TOKEN="your_jwt_token"

curl -X GET http://localhost:8000/api/email/campaigns \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN"

# Response:
# {
#   "success": true,
#   "campaigns": [
#     {
#       "id": 1,
#       "name": "Weekly Prophetic Revelation",
#       "status": "scheduled",
#       "recipients_count": 2,
#       "sent_count": 0,
#       "open_rate": 0,
#       "click_rate": 0
#     }
#   ]
# }
```

### Send Campaign Now
```bash
TOKEN="your_jwt_token"

curl -X POST http://localhost:8000/api/email/campaign/1/send \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{}'

# Response:
# {
#   "success": true,
#   "campaign_id": 1,
#   "sent_count": 2,
#   "message": "Campaign sent successfully to 2 recipients"
# }
```

### Get Campaign Statistics
```bash
TOKEN="your_jwt_token"

curl -X GET http://localhost:8000/api/email/campaign/1/stats \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN"

# Response:
# {
#   "success": true,
#   "campaign_id": 1,
#   "total_sent": 2,
#   "delivered": 2,
#   "bounced": 0,
#   "opened": 1,
#   "clicked": 1,
#   "open_rate": 50.0,
#   "click_rate": 50.0
# }
```

### Send Test Email
```bash
TOKEN="your_jwt_token"

curl -X POST http://localhost:8000/api/email/test \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "to_email":"your-email@gmail.com",
    "subject":"Test: Wings of the Cherubim",
    "message":"<h1>This is a test</h1><p>If you see this, email is working!</p>"
  }'
```

---

## 👥 USER MANAGEMENT

### Get All Users (Admin Only)
```bash
TOKEN="your_jwt_token"

curl -X GET http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN"

# Response:
# {
#   "success": true,
#   "users": [
#     {
#       "id": 1,
#       "name": "Divine Administrator",
#       "email": "admin@wingsofthecherubim.quest",
#       "role": "admin",
#       "created_at": "2026-05-03T10:00:00Z"
#     }
#   ]
# }
```

### Get User Profile
```bash
TOKEN="your_jwt_token"

curl -X GET http://localhost:8000/api/users/me \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN"
```

### Update User
```bash
TOKEN="your_jwt_token"

curl -X PUT http://localhost:8000/api/users/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name":"Gregory Schadt",
    "email":"gregory@wingsofthecherubim.quest"
  }'
```

### Delete User (Admin Only)
```bash
TOKEN="your_jwt_token"

curl -X DELETE http://localhost:8000/api/users/2 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🗄️ DATABASE QUERIES (Direct MySQL)

### View All Users
```bash
mysql -u root -p wings_of_cherubim -e "SELECT id, name, email, role FROM users;"
```

### View All Prophetic Insights
```bash
mysql -u root -p wings_of_cherubim -e "SELECT id, title, category, status, version FROM insights;"
```

### View Complete Insight Version History
```bash
mysql -u root -p wings_of_cherubim -e "
SELECT 
  iv.version,
  iv.title,
  LEFT(iv.content, 100) as content_preview,
  iv.created_at,
  u.name as created_by
FROM insight_versions iv
JOIN users u ON iv.created_by = u.id
WHERE iv.insight_id = 1
ORDER BY iv.version DESC;
"
```

### View All Zoom Meetings
```bash
mysql -u root -p wings_of_cherubim -e "
SELECT 
  zm.id,
  zm.topic,
  zm.scheduled_at,
  COUNT(mp.id) as participant_count
FROM zoom_meetings zm
LEFT JOIN meeting_participants mp ON zm.id = mp.meeting_id
GROUP BY zm.id
ORDER BY zm.scheduled_at DESC;
"
```

### View Email Campaign Statistics
```bash
mysql -u root -p wings_of_cherubim -e "
SELECT 
  ec.id,
  ec.name,
  ec.status,
  COUNT(DISTINCT cr.id) as recipients,
  SUM(cr.opened) as opened,
  SUM(cr.clicked) as clicked,
  ROUND(SUM(cr.opened) / COUNT(*) * 100, 2) as open_rate
FROM email_campaigns ec
JOIN campaign_recipients cr ON ec.id = cr.campaign_id
GROUP BY ec.id
ORDER BY ec.created_at DESC;
"
```

### View Audit Log (Who Did What)
```bash
mysql -u root -p wings_of_cherubim -e "
SELECT 
  al.id,
  u.name,
  al.action,
  al.resource_type,
  al.resource_id,
  al.created_at
FROM audit_logs al
JOIN users u ON al.user_id = u.id
ORDER BY al.created_at DESC
LIMIT 20;
"
```

### Backup Database
```bash
# Full backup
mysqldump -u root -p wings_of_cherubim > backup_$(date +%Y%m%d_%H%M%S).sql

# Compressed backup
mysqldump -u root -p wings_of_cherubim | gzip > backup_$(date +%Y%m%d_%H%M%S).sql.gz
```

### Restore Database
```bash
mysql -u root -p wings_of_cherubim < backup_20260503_100000.sql
```

---

## 🔧 COMMON TROUBLESHOOTING COMMANDS

### Test Database Connection
```bash
mysql -u root -p -h localhost -e "SELECT 1;"
```

### Check PHP Version & Extensions
```bash
php --version
php -m | grep -E "mysql|pdo|json"
```

### Check if Port 8000 is Available
```bash
# macOS/Linux
lsof -i :8000

# Windows
netstat -ano | findstr :8000
```

### Verify .env File
```bash
cat .env
```

### Check API Error Logs
```bash
tail -f logs/api.log
tail -f logs/error.log
```

### Test Zoom Credentials
```bash
curl -X POST https://zoom.us/oauth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=account_credentials&account_id=$ZOOM_ACCOUNT_ID&client_id=$ZOOM_CLIENT_ID&client_secret=$ZOOM_CLIENT_SECRET"
```

### Test Email SMTP
```bash
curl -X POST http://localhost:8000/api/email/test \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"to_email":"your@email.com","subject":"Test","message":"Test"}'
```

---

## 📝 ENVIRONMENT VARIABLES REFERENCE

```bash
# Application
APP_NAME=Wings of the Cherubim
APP_URL=http://localhost:8000
APP_ENV=development
DEBUG=true

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=wings_of_cherubim
DB_TYPE=mysql

# Security
JWT_SECRET=your_random_32_char_key
ENCRYPTION_KEY=your_random_32_char_key

# Email (Gmail SMTP)
MAIL_DRIVER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_ENCRYPTION=tls
MAIL_USER=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_FROM_NAME=Wings of the Cherubim

# Zoom
ZOOM_ACCOUNT_ID=your_account_id
ZOOM_CLIENT_ID=your_client_id
ZOOM_CLIENT_SECRET=your_client_secret
ZOOM_WEBHOOK_SECRET=optional

# Admin
ADMIN_EMAIL=admin@wingsofthecherubim.quest
```

---

## 🎯 USEFUL CURL TIPS

### Save output to file
```bash
curl ... > response.json
```

### Pretty print JSON
```bash
curl ... | jq '.'
```

### See response headers
```bash
curl -v ...
```

### Include response time
```bash
curl -w "Response time: %{time_total}s\n" ...
```

### Test with Bearer token
```bash
curl -H "Authorization: Bearer $TOKEN" ...
```

---

## 💡 SCRIPT: Loop Through Insights & Send Campaign

```bash
#!/bin/bash

TOKEN="your_jwt_token"
BASE_URL="http://localhost:8000"

# Get all insights
INSIGHTS=$(curl -s "$BASE_URL/api/insights/list" | jq '.insights[]')

while IFS= read -r insight; do
  ID=$(echo $insight | jq '.id')
  TITLE=$(echo $insight | jq '.title')
  
  echo "Processing insight $ID: $TITLE"
  
  # Send email campaign for each insight
  curl -X POST "$BASE_URL/api/email/campaign/create" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d "{
      \"name\":\"Campaign for $TITLE\",
      \"subject\":\"New Revelation: $TITLE\",
      \"html_content\":\"<h1>$TITLE</h1><p>Check out this new insight!</p>\"
    }"
  
  echo "Campaign created for $TITLE"
  
done <<< "$INSIGHTS"
```

---

## 📊 ALL IN ONE TEST SCRIPT

Save as `test-all.sh`:

```bash
#!/bin/bash

BASE_URL="http://localhost:8000"

echo "🧪 Testing Wings of the Cherubim API"
echo "======================================"

# 1. Login
echo -e "\n1️⃣ Testing Login..."
LOGIN=$(curl -s -X POST $BASE_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"admin@wingsofthecherubim.quest",
    "password":"ChangeMe123!Secure"
  }')

TOKEN=$(echo $LOGIN | jq -r '.token')
echo "✅ Got token: ${TOKEN:0:20}..."

# 2. Create Insight
echo -e "\n2️⃣ Creating Prophetic Insight..."
INSIGHT=$(curl -s -X POST $BASE_URL/api/insights/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title":"Test Insight",
    "content":"This is a test",
    "category":"Prophecy"
  }')

INSIGHT_ID=$(echo $INSIGHT | jq '.insight_id')
echo "✅ Created insight ID: $INSIGHT_ID"

# 3. List Insights
echo -e "\n3️⃣ Listing Insights..."
curl -s $BASE_URL/api/insights/list | jq '.insights | length'
echo "✅ Insights listed"

# 4. Schedule Meeting
echo -e "\n4️⃣ Scheduling Zoom Meeting..."
curl -s -X POST $BASE_URL/api/zoom/schedule \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "topic":"Test Meeting",
    "scheduled_at":"2026-05-10 19:00:00",
    "duration":60
  }' | jq '.'
echo "✅ Meeting scheduled"

# 5. Send Test Email
echo -e "\n5️⃣ Testing Email..."
curl -s -X POST $BASE_URL/api/email/test \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "to_email":"test@example.com",
    "subject":"Test",
    "message":"Test email"
  }' | jq '.'
echo "✅ Email tested"

echo -e "\n🎉 All tests completed!"
```

Run it:
```bash
chmod +x test-all.sh
./test-all.sh
```

---

**🙏 Your complete API reference for spreading divine revelations globally!**
