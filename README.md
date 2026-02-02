# Healthcare Recommendation System (MVP Slice)

A high-speed, end-to-end healthcare recommendation engine designed to match users with the most appropriate care options in under 30 seconds.

## 🚀 Live Demo
- **Frontend:** [https://mvpalex.web.app](https://mvpalex.web.app)
- **Backend:** Hosted on VPS (72.61.108.21)

---

## 🛠 What I Built
This MVP focuses on **speed, clarity, and factual accuracy** rather than visual polish. It delivers a complete end-to-end flow:

1.  **Intake Engine:** A streamlined 5-question form capturing medical needs, urgency, and preferences.
2.  **Rule-Based Logic:** A weighted heuristic backend that matches users against a catalog of 10 clinical care options (Urgent Care, Telehealth, Concierge, etc.).
3.  **AI Navigator:** Integration with OpenAI (GPT-5 NANO) to generate concise, factual, and professional clinical justifications for each recommendation.
4.  **Real-Time Sync:** Utilizing Firebase Realtime Database for instantaneous result delivery without page reloads.
5.  **Zero-Friction Auth:** Automatic anonymous authentication to ensure data privacy without requiring account creation.

---

## 🏗 Tech Stack
- **Frontend:** Vue 3 (Composition API), Vite, Vue Router.
- **Backend:** Node.js (Standalone Listener), Firebase Admin SDK.
- **AI:** OpenAI API (GPT-5-NANO).
- **Database/Auth:** Firebase Realtime DB & Anonymous Auth.
- **Infrastructure:** Firebase Hosting (Frontend) + VPS with PM2 (Backend).

---

## 📁 Project Structure
```text
mvpalex/
├── web/                  # Vue 3 Frontend
│   ├── src/pages/        # Home, Intake (Form), Result
│   ├── src/firebase/     # Client-side RTDB & Auth logic
│   └── public/           # SEO (Sitemap, Robots.txt)
├── backend/              # Node.js Backend
│   ├── ai/               # OpenAI integration & prompts
│   ├── matching/         # Heuristic engine & healthcare catalog
│   └── index.js          # DB Listener (child_added trigger)
└── deploy/               # Automated deployment scripts for VPS
```

---

## ⚖️ Tradeoffs & Judgment
- **Rule-Based vs. ML:** Used weighted heuristics for matching. This ensures 100% explainability and instant speed, which is critical for healthcare trust.
- **Sober UI/UX:** Intentionally avoided "polish" to focus on flow fluidity. The design is minimal and professional to emphasize clinical utility.
- **Anonymous Auth:** Prioritized zero-friction testing. Users can get results immediately without the drop-off risk of a login wall.
- **Realtime DB over REST:** Chose RTDB for the "magic" feeling of results appearing the moment the backend processes them.

---

## ⏩ What’s Next?
If we continue, the next logical steps are:
1.  **Clinical Verification:** Integrate with real-time provider availability APIs.
2.  **Patient History:** Allow users to link anonymous sessions to a persistent account.
3.  **Alternative Options:** Show top 3 recommendations with a comparison matrix.
4.  **Analytics:** Track "drop-off" points in the 5-question flow to optimize conversion.

---

## 🔧 Installation & Setup
Refer to [SETUP_QUICK.md](./SETUP_QUICK.md) for 2-minute local environment setup.

**Built for Alex (MVP Slice 1)**
