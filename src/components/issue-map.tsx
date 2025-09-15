'use client';

import { useState } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from '@vis.gl/react-google-maps';
import { issues } from '@/lib/data';
import type { Issue } from '@/types';
import Link from 'next/link';
import { Button } from './ui/button';

export function IssueMap() {
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const position = { lat: 18.5204, lng: 73.8567 }; // Centered on Pune
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="flex h-full items-center justify-center bg-muted">
        <p className="text-center text-muted-foreground">
          Google Maps API key is not configured.
          <br />
          Please set the NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable.
        </p>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <div style={{ height: '100%', width: '100%' }}>
        <Map
          defaultCenter={position}
          defaultZoom={13}
          mapId="civicwatch_map"
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        >
          {issues.map((issue) => (
            <AdvancedMarker
              key={issue.id}
              position={issue.location}
              onClick={() => setSelectedIssue(issue)}
            >
              <Pin
                background={'#4A8FE7'}
                borderColor={'#3B72B9'}
                glyphColor={'#FFFFFF'}
              />
            </AdvancedMarker>
          ))}

          {selectedIssue && (
            <InfoWindow
              position={selectedIssue.location}
              onCloseClick={() => setSelectedIssue(null)}
            >
              <div className="p-2">
                <h3 className="font-headline text-lg font-semibold">
                  {selectedIssue.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {selectedIssue.location.name}
                </p>
                <p className="my-2 text-sm">
                  {selectedIssue.description.substring(0, 100)}...
                </p>
                <Button asChild size="sm">
                  <Link href={`/issues/${selectedIssue.id}`}>View Details</Link>
                </Button>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}
