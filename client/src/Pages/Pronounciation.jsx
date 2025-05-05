import React, { useState } from 'react';
import { Headphones, Volume2, Mic, Play, Pause, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';

const Pronunciation = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('alphabet');

  const alphabet = [
    { letter: "A", sound: "a as in 'father'", example: "Aban (fortress)" },
    { letter: "B", sound: "b as in 'boy'", example: "Bere (time)" },
    { letter: "D", sound: "d as in 'dog'", example: "Dua (tree)" },
    { letter: "E", sound: "e as in 'egg'", example: "Efiase (home)" },
    { letter: "Ɛ", sound: "e as in 'bet'", example: "Ɛdɔm (love)" },
    { letter: "F", sound: "f as in 'fish'", example: "Fufu (pounded cassava)" },
    { letter: "G", sound: "g as in 'go'", example: "Gye (take)" },
    { letter: "H", sound: "h as in 'house'", example: "Hwɛ (look)" },
    { letter: "I", sound: "i as in 'machine'", example: "Ibi (here)" },
    { letter: "K", sound: "k as in 'kite'", example: "Kɔkɔɔ (red)" },
    { letter: "M", sound: "m as in 'man'", example: "Me (I)" },
    { letter: "N", sound: "n as in 'no'", example: "Nsuo (water)" },
    { letter: "O", sound: "o as in 'or'", example: "Obi (someone)" },
    { letter: "Ɔ", sound: "o as in 'pot'", example: "Ɔkɔm (hunger)" },
    { letter: "P", sound: "p as in 'pot'", example: "Pɛ (want)" },
    { letter: "R", sound: "r as in 'red'", example: "Rɔbɔ (work)" },
    { letter: "S", sound: "s as in 'sun'", example: "Sika (money)" },
    { letter: "T", sound: "t as in 'top'", example: "Tumi (power)" },
    { letter: "U", sound: "u as in 'rule'", example: "Uwu (death)" },
    { letter: "W", sound: "w as in 'we'", example: "Wɔn (they)" },
    { letter: "Y", sound: "y as in 'yes'", example: "Yɛ (do)" }
  ];

  const commonPhrases = [
    { phrase: "Ɛte sɛn?", meaning: "How are you?", audio: "" },
    { phrase: "Me ho yɛ", meaning: "I'm fine", audio: "" },
    { phrase: "Meda wo ase", meaning: "Thank you", audio: "" },
    { phrase: "Mepa wo kyɛw", meaning: "Please", audio: "" },
    { phrase: "Wo din de sɛn?", meaning: "What is your name?", audio: "" },
    { phrase: "Me din de...", meaning: "My name is...", audio: "" },
    { phrase: "Ɛhe na ɛwɔ...?", meaning: "Where is...?", audio: "" },
    { phrase: "Mepɛ sɛ me nya...", meaning: "I would like to have...", audio: "" }
  ];

  return (
    <div className="container py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">Pronunciation Guide</h1>
        <p className="text-xl text-amber-800 max-w-3xl mx-auto">
          Master Akan sounds with native speaker audio and interactive practice
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-8">
        <Button
          variant="ghost"
          className={`rounded-none border-b-2 ${activeTab === 'alphabet' ? 'border-amber-600 text-amber-900' : 'border-transparent'}`}
          onClick={() => setActiveTab('alphabet')}
        >
          <Headphones className="h-5 w-5 mr-2" /> Alphabet
        </Button>
        <Button
          variant="ghost"
          className={`rounded-none border-b-2 ${activeTab === 'phrases' ? 'border-amber-600 text-amber-900' : 'border-transparent'}`}
          onClick={() => setActiveTab('phrases')}
        >
          <Mic className="h-5 w-5 mr-2" /> Common Phrases
        </Button>
      </div>

      {/* Alphabet Tab */}
      {activeTab === 'alphabet' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {alphabet.map((letter, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-3xl">{letter.letter}</CardTitle>
                <Button variant="outline" size="icon" onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">{letter.sound}</p>
                <p className="font-medium">Example: <span className="text-amber-600">{letter.example}</span></p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Common Phrases Tab */}
      {activeTab === 'phrases' && (
        <div className="space-y-4">
          {commonPhrases.map((phrase, index) => (
            <Collapsible key={index}>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{phrase.phrase}</CardTitle>
                      <CardDescription>{phrase.meaning}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={() => setIsPlaying(!isPlaying)}>
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                  </div>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="bg-amber-50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Pronunciation Tips:</h4>
                      <p className="text-sm text-muted-foreground">
                        Break down the phrase into syllables and practice each part slowly before combining them.
                      </p>
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm">
                          <Volume2 className="h-4 w-4 mr-2" /> Slow Speed
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mic className="h-4 w-4 mr-2" /> Record Yourself
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>
      )}

      {/* Practice Section */}
      <div className="mt-12 bg-amber-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">Practice Your Pronunciation</h2>
        <p className="text-gray-700 mb-6">
          Use our interactive recorder to compare your pronunciation with native speakers
        </p>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h3 className="font-medium mb-2">Native Speaker</h3>
              <div className="flex items-center gap-4 mb-4">
                <Button variant="outline" size="icon">
                  <Play className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">Listen to the phrase</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 w-3/4"></div>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-medium mb-2">Your Recording</h3>
              <div className="flex items-center gap-4 mb-4">
                <Button variant={isPlaying ? "default" : "outline"} size="icon">
                  <Mic className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  {isPlaying ? "Recording..." : "Press to record"}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-amber-300 w-1/2"></div>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Button className="bg-amber-600 hover:bg-amber-700">
              Compare Pronunciations
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pronunciation;