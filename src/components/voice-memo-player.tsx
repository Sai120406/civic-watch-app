'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Loader2, Mic, Play, Square } from 'lucide-react';
import { transcribeAudio } from '@/ai/flows/transcribe-audio';
import type { Issue } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export default function VoiceMemoPlayer({ issue }: { issue: Issue }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const handlePlayPause = () => {
    const audio = document.getElementById('voice-memo') as HTMLAudioElement;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTranscribe = async () => {
    if (!issue.voiceMemoUrl) return;
    setIsTranscribing(true);
    setTranscription(null);
    try {
      const response = await fetch(issue.voiceMemoUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64audio = reader.result as string;
        try {
          const result = await transcribeAudio({ audio: base64audio });
          setTranscription(result.transcription);
        } catch (e) {
            console.error(e);
            setTranscription('Failed to transcribe audio.');
        } finally {
            setIsTranscribing(false);
        }
      };
    } catch (error) {
      console.error('Failed to transcribe audio:', error);
      setTranscription('Failed to load audio for transcription.');
      setIsTranscribing(false);
    }
  };

  return (
    <Card>
        <CardHeader>
            <CardTitle>Voice Memo</CardTitle>
            <CardDescription>Listen to the user's voice report and view the AI-powered transcription.</CardDescription>
        </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 rounded-lg bg-muted p-4">
          <Button size="icon" onClick={handlePlayPause}>
            {isPlaying ? <Square className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <div className="flex-1 text-sm text-muted-foreground">
            <audio
              id="voice-memo"
              src={issue.voiceMemoUrl}
              onEnded={() => setIsPlaying(false)}
            />
            {isPlaying ? 'Playing voice memo...' : 'Click to play voice memo'}
          </div>
        </div>

        <div>
            <Button onClick={handleTranscribe} disabled={isTranscribing}>
            {isTranscribing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Mic className="mr-2 h-4 w-4" />
            )}
            {isTranscribing ? 'Transcribing...' : 'Transcribe Voice Memo'}
            </Button>
        </div>

        {transcription && (
          <div className="space-y-2 rounded-lg border bg-background p-4">
            <h4 className="font-semibold">Transcription:</h4>
            <p className="text-sm text-foreground/80">{transcription}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
