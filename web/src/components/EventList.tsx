'use client';
import { useState } from 'react';
import Event from '../components/Event';
const listEvents = [
  { id: 1, title: 'Coldplay', image: '/coldplay.jpg' },
  { id: 2, title: 'The Weeknd', image: '/theweeknd.png' },
  { id: 3, title: 'Billie Eilish', image: '/billie.jpeg' },
  { id: 4, title: 'BabyMetal', image: '/baby-metal.webp' },
  { id: 5, title: 'One Republic', image: '/one-republic.png' },
  { id: 6, title: 'Aespa', image: '/aespa.webp' },
  { id: 7, title: 'BTS', image: '/bts2.jpg' },
  // Add more events as needed
];

export default function EventList() {
  const [expandedEventId, setExpandedEventId] = useState<number | null>(null);

  return (
    <div className="mt-8 flex justify-center items-center overflow-x-auto space-x-4 font-new-amsterdam">
      {listEvents.map((event) => (
        <Event
          key={event.id}
          title={event.title}
          image={event.image}
          isExpanded={expandedEventId === event.id}
          onClick={() =>
            setExpandedEventId(expandedEventId === event.id ? null : event.id)
          }
        />
      ))}
    </div>
  );
}
