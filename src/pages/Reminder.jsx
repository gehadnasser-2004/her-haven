import { useState, useEffect } from "react";
import {
  Bell,
  Droplet,
  Pill,
  Footprints,
  Heart,
  Apple,
  Moon,
  Stethoscope,
  Syringe,
  Plus,
  Trash2,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function Reminder() {
  const [reminders, setReminders] = useState({
    daily: [
      { icon: <Droplet size={20} />, title: "Hydration", time: "08:00" },
      { icon: <Pill size={20} />, title: "Prenatal Vitamins", time: "09:00" },
      { icon: <Footprints size={20} />, title: "Morning Walk", time: "10:00" },
    ],
    weekly: [
      { icon: <Heart size={20} />, title: "Gentle Yoga", time: "Monday 08:00" },
      {
        icon: <Apple size={20} />,
        title: "Nutrition Check-in",
        time: "Wednesday 09:00",
      },
      {
        icon: <Moon size={20} />,
        title: "Relaxation Exercise",
        time: "Friday 20:00",
      },
    ],
    monthly: [
      {
        icon: <Stethoscope size={20} />,
        title: "Doctor's Appointment",
        time: "15 14:00",
      },
      {
        icon: <Syringe size={20} />,
        title: "Refill Prescriptions",
        time: "28 12:00",
      },
    ],
  });

  const [enabled, setEnabled] = useState({});
  const [newReminder, setNewReminder] = useState({
    title: "",
    time: "",
    category: "daily",
  });

  // 🔔 Function to play sound
  const playSound = () => {
    const audio = new Audio("/notification.mp3"); // place file inside public/
    audio.play();
  };

  // 🕒 Check reminders every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5); // "HH:MM"

      setReminders((prev) => {
        const updated = { ...prev };

        Object.keys(updated).forEach((category) => {
          updated[category] = updated[category].map((rem) => {
            if (
              rem.time === currentTime &&
              !rem.triggered &&
              enabled[rem.title]
            ) {
              toast.success(`⏰ ${rem.title} - ${rem.time}`, {
                duration: Infinity, // stays until user closes
                position: "top-right",
              });
              playSound();
              return { ...rem, triggered: true };
            }
            return rem;
          });
        });

        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [enabled]);

  const toggleReminder = (title) => {
    setEnabled((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const deleteReminder = (category, title) => {
    setReminders((prev) => {
      const updated = { ...prev };
      updated[category] = updated[category].filter(
        (rem) => rem.title !== title
      );
      return updated;
    });

    setEnabled((prev) => {
      const updated = { ...prev };
      delete updated[title];
      return updated;
    });

    toast.error(`🗑️ Deleted reminder: ${title}`, {
      position: "top-right",
    });
  };

  const addReminder = (e) => {
    e.preventDefault();
    if (!newReminder.title || !newReminder.time) return;

    setReminders((prev) => ({
      ...prev,
      [newReminder.category]: [
        ...prev[newReminder.category],
        {
          icon: <Bell size={20} />,
          title: newReminder.title,
          time: newReminder.time,
        },
      ],
    }));

    setNewReminder({ title: "", time: "", category: "daily" });
  };

  const Section = ({ label, items, category }) => (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">{label}</h3>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-gray-50 p-3 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="text-gray-700">{item.icon}</span>
              <div>
                <p className="font-medium text-gray-800">{item.title}</p>
                <p className="text-sm text-gray-500">{item.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Toggle Switch */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!enabled[item.title]}
                  onChange={() => toggleReminder(item.title)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-pink-500"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
              </label>

              {/* Delete Button */}
              <button
                onClick={() => deleteReminder(category, item.title)}
                className="p-2 text-red-500 hover:bg-red-100 rounded-lg"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-white">
      <Toaster /> {/* 🔔 Toast container */}
      {/* Sidebar */}
      <aside className="w-64 bg-gray-50 border-r p-6">
        <h2 className="font-bold text-xl mb-6">Nurture</h2>
        <nav className="space-y-3">
          <button className="flex items-center gap-2 text-gray-600 hover:text-pink-500">
            <span>🏠</span> Overview
          </button>
          <button className="flex items-center gap-2 text-pink-500 font-medium">
            <Bell size={18} /> Reminders
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-pink-500">
            📚 Resources
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-pink-500">
            👥 Community
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-pink-500">
            👤 Profile
          </button>
        </nav>
      </aside>
      {/* Main content */}
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold">Reminders</h1>
        <p className="text-gray-500 text-sm">
          Stay on top of your health with personalized reminders.
        </p>

        {/* Create Reminder Form */}
        <form
          onSubmit={addReminder}
          className="mt-6 p-4 bg-gray-100 rounded-xl shadow-sm flex gap-3 items-end"
        >
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={newReminder.title}
              onChange={(e) =>
                setNewReminder({ ...newReminder, title: e.target.value })
              }
              className="mt-1 w-full border rounded-lg p-2 text-sm"
              placeholder="Reminder title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Time
            </label>
            <input
              type="time"
              value={newReminder.time}
              onChange={(e) =>
                setNewReminder({ ...newReminder, time: e.target.value })
              }
              className="mt-1 w-32 border rounded-lg p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={newReminder.category}
              onChange={(e) =>
                setNewReminder({ ...newReminder, category: e.target.value })
              }
              className="mt-1 border rounded-lg p-2 text-sm"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-pink-600"
          >
            <Plus size={18} /> Add
          </button>
        </form>

        {/* Reminder Lists */}
        <Section
          label="Daily Reminders"
          items={reminders.daily}
          category="daily"
        />
        <Section
          label="Weekly Reminders"
          items={reminders.weekly}
          category="weekly"
        />
        <Section
          label="Monthly Reminders"
          items={reminders.monthly}
          category="monthly"
        />
      </main>
    </div>
  );
}
