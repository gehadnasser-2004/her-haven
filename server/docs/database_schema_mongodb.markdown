# Database Schema for Her Haven (MongoDB)

This document outlines the database collections and a possible MongoDB schema for the "Her Haven" application, designed to support its core functionalities as of September 02, 2025. We've switched to MongoDB for flexibility in handling embedded documents within the user collection, making it easier to manage related data like calendars, reminders, and scans.

## Collections and Schema

### 1. Users (DomainUser)
- NOTE: Authentication data lives in a separate `Account` collection. This `Users` collection holds project-profile data linked to an Account.
- **Description**: Stores user profile/project data, with embedded arrays for calendar events, reminders, and scans.
- **Fields**:
  - `_id` (ObjectId, Auto-generated)
  - `account` (ObjectId, Reference to Account._id, Unique per profile)
  - `name` (String, e.g., "Sophia Carter")
  - `email` (String, e.g., "sophia.carter@example.com")
  - `num_preg` (Integer, e.g., 1)
  - `num_children` (Integer, e.g., 2)
  - `created_at` (Date, e.g., new Date("2025-09-02T14:38:00Z"))
  - `updated_at` (Date, e.g., new Date("2025-09-02T14:38:00Z"))
  - `settings` (Object, Optional, e.g., `{notifications: true, privacy: "public"}`)
  - `calendar` (Array of Objects): Embedded calendar events.
    - Each event: `{ title: String (e.g., "Prenatal Checkup"), date: Date (e.g., new Date("2025-09-01")), description: String (Optional, e.g., "Routine ultrasound"), completed: Boolean (Default: false), created_at: Date (e.g., new Date("2025-09-02T14:38:00Z")) }`
  - `reminders` (Array of Objects): Embedded reminders.
    - Each reminder: `{ frequency: String (e.g., "daily"), title: String (e.g., "Hydration Reminder"), description: String (Optional, e.g., "Drink 8 glasses of water"), time: String (Optional, e.g., "08:00"), active: Boolean (Default: true), created_at: Date (e.g., new Date("2025-09-02T14:38:00Z")) }`
  - `scans` (Array of Objects): Embedded scans.
    - Each scan: `{ scan_img: String (e.g., "s3://bucket/mammogram123.jpg"), upload_date: Date (e.g., new Date("2025-09-02T14:38:00Z")), analysis_status: String (e.g., "pending"), result: Object (Optional, e.g., {riskScore: 0.2, triage: "low"}) }`
- **MongoDB Schema Example** (Using Mongoose-like structure for clarity):
```javascript
{
  _id: ObjectId,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  num_preg: { type: Number },
  num_children: { type: Number },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  settings: { type: Object },
  calendar: [{
    title: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now }
  }],
  reminders: [{
    frequency: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    time: { type: String },
    active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now }
  }],
  scans: [{
    scan_img: { type: String, required: true },
    upload_date: { type: Date, default: Date.now },
    analysis_status: { type: String, default: 'pending' },
    result: { type: Object }
  }]
}
```
- **Notes**: 1) Separation of concerns: `Account` handles security, login, and verification; `Users` handles product data. 2) Embedding reduces joins but monitor array sizes; if they grow large, consider separate collections with references.

### 2. Account (Auth)
- **Description**: Authentication and security data used by the app; separate from Users profile data.
- **Fields**:
  - `_id` (ObjectId)
  - `name` (String)
  - `email` (String, Unique)
  - `password` (String, Hashed)
  - `role` (String, enum: ["admin","user"], default: "user")
  - `verificationToken` (String)
  - `isVerified` (Boolean, default: false)
  - `verified` (Date)
  - `passwordToken` (String)
  - `passwordTokenExpirationDate` (Date)
- **Indexes**: unique(email)

### 3. Resources
- **Description**: Manages articles, videos, and tutorials available to users (standalone collection).
- **Fields**:
  - `_id` (ObjectId, Auto-generated)
  - `type` (String, e.g., "article", "tutorial", "video")
  - `title` (String, e.g., "Nutrition During Pregnancy")
  - `genre` (String, e.g., "Nutrition", "Baby Care", "Mental Health")
  - `description` (String, e.g., "Learn about essential nutrients...")
  - `url` (String, e.g., "https://herhaven.com/resources/nutrition")
  - `created_at` (Date, e.g., new Date("2025-09-02T14:38:00Z"))
- **MongoDB Schema Example**:
```javascript
{
  _id: ObjectId,
  type: { type: String, required: true },
  title: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
}
```

### 4. Doctors
- **Description**: Stores doctor information for the "Find a Doctor" feature (new collection as requested).
- **Fields**:
  - `_id` (ObjectId, Auto-generated)
  - `name` (String, e.g., "Dr. Amelia Harper")
  - `specialty` (String, e.g., "Obstetrics & Gynecology")
  - `contact_info` (Object, e.g., { phone: "123-456-7890", email: "amelia.harper@example.com" })
  - `location` (String, e.g., "Northeast, USA")
  - `created_at` (Date, e.g., new Date("2025-09-02T14:38:00Z"))
- **MongoDB Schema Example**:
```javascript
{
  _id: ObjectId,
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  contact_info: { type: Object, required: true },
  location: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
}
```

### 5. DepressionAssessments
- **Description**: Tracks depression screening results for users, updated each time a user takes the questionnaire (new collection as suggested).
- **Fields**:
  - `_id` (ObjectId, Auto-generated)
  - `user_id` (ObjectId, Reference to Users._id)
  - `date` (Date, e.g., new Date("2025-09-02T14:38:00Z"))
  - `result` (String, e.g., "Mild symptoms detected")
  - `notes` (String, Optional, e.g., "Recommended therapist referral")
  - `created_at` (Date, e.g., new Date("2025-09-02T14:38:00Z"))
- **MongoDB Schema Example**:
```javascript
{
  _id: ObjectId,
  user_id: { type: ObjectId, ref: 'Users', required: true },
  date: { type: Date, required: true },
  result: { type: String, required: true },
  notes: { type: String },
  created_at: { type: Date, default: Date.now }
}
```

### 6. FixedMilestones (Optional)
- **Description**: Stores predefined milestones without specific dates, which can be added to a user's calendar upon pregnancy registration (new collection as noted).
- **Fields**:
  - `_id` (ObjectId, Auto-generated)
  - `title` (String, e.g., "First Trimester Checkup")
  - `description` (String, e.g., "Initial prenatal visit")
  - `relative_week` (Integer, Optional, e.g., 12) // Relative to pregnancy start
  - `created_at` (Date, e.g., new Date("2025-09-02T14:38:00Z"))
- **MongoDB Schema Example**:
```javascript
{
  _id: ObjectId,
  title: { type: String, required: true },
  description: { type: String },
  relative_week: { type: Number },
  created_at: { type: Date, default: Date.now }
}
```
- **Notes**: When a user registers a pregnancy (e.g., updates `num_preg`), application logic can copy these to the user's embedded `calendar` array with calculated dates.

## Additional Considerations
- **Relationships**: 
  - `DepressionAssessments` references `Users` via `user_id`.
  - `Resources`, `Doctors`, and `FixedMilestones` are standalone.
  - For embedded arrays in `Users` (calendar, reminders, scans), use MongoDB's array operators (e.g., `$push`, `$pull`) for updates.
- **Indexes**: Create indexes on `email` in `Users` (unique), `user_id` in `DepressionAssessments`, and search fields like `genre` in `Resources` or `location` in `Doctors`.
- **Validation**: Use MongoDB schema validation or Mongoose schemas to enforce rules (e.g., unique email, hashed password).
- **Missing Entities**: If needed, add collections for Notifications (e.g., `{user_id, message, read, created_at}`) or link Resources to Users via a favorites array in Users.

