// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { db } from "../services/firebase";
// import { doc, setDoc, getDoc } from "firebase/firestore";
// import { useAuth } from "../context/AuthContext"; 
// import { 
//   Heart, 
//   ArrowLeft, 
//   Stars, 
//   Sparkles,
//   CheckCircle,
//   Users,
//   Zap,
//   ChevronRight
// } from 'lucide-react';

// // ... (keep all your existing questionPool and compatibilityProfiles objects)
// const questionPool = {
//   mcq: [
//     {
//       id: 1,
//       question: "How do you usually navigate conflict in a relationship?",
//       options: [
//         { id: 'a', text: "I shut down and need time alone", trait: "fearfulAvoidant" },
//         { id: 'b', text: "I try to work through it logically", trait: "practicalRealist" },
//         { id: 'c', text: "I speak my heart openly", trait: "romanticIdealist" },
//         { id: 'd', text: "I make sure the other person feels okay first", trait: "caregiverNurturer" }
//       ]
//     },

//       {
//         id: 2,
//         question: "How can we help each other maintain our individuality while staying connected?",
//         options: [
//           { id: 'a', text: "Having designated 'me time'", trait: "fearfulAvoidant" },
//           { id: 'b', text: "Supporting each other's hobbies", trait: "caregiverNurturer" },
//           { id: 'c', text: "Maintaining separate friend groups", trait: "fearfulAvoidant" },
//           { id: 'd', text: "Encouraging personal goals", trait: "practicalRealist" }
//         ]
//       },
//       {
//         id: 3,
//         question: "When you're having a rough day, what's the most comforting thing I can do?",
//         options: [
//           { id: 'a', text: "Listen without trying to fix it", trait: "caregiverNurturer" },
//           { id: 'b', text: "Give you space to process", trait: "fearfulAvoidant" },
//           { id: 'c', text: "Distract you with fun activities", trait: "romanticIdealist" },
//           { id: 'd', text: "Offer practical solutions", trait: "practicalRealist" }
//         ]
//       },
//       {
//         id: 4,
//         question: "How do you feel about how we handle disagreements these days?",
//         options: [
//           { id: 'a', text: "We communicate well and resolve quickly", trait: "practicalRealist" },
//           { id: 'b', text: "We could improve our conflict resolution", trait: "practicalRealist" },
//           { id: 'c', text: "We avoid conflict sometimes", trait: "fearfulAvoidant" },
//           { id: 'd', text: "It depends on the topic", trait: "practicalRealist" }
//         ]
//       },
//       {
//         id: 5,
//         question: "What's your love language in conflict?",
//         options: [
//           { id: 'a', text: "Space to cool off", trait: "fearfulAvoidant" },
//           { id: 'b', text: "Reassurance and affection", trait: "caregiverNurturer" },
//           { id: 'c', text: "Practical solutions", trait: "practicalRealist" },
//           { id: 'd', text: "Humor to lighten mood", trait: "romanticIdealist" }
//         ]
//       },
//       {
//         id: 6,
//         question: "How do you define emotional safety in a relationship?",
//         options: [
//           { id: 'a', text: "Being able to be completely vulnerable", trait: "caregiverNurturer" },
//           { id: 'b', text: "Knowing conflicts will be resolved fairly", trait: "practicalRealist" },
//           { id: 'c', text: "Feeling accepted without judgment", trait: "romanticIdealist" },
//           { id: 'd', text: "Having complete trust", trait: "romanticIdealist" }
//         ]
//       },
//       {
//         id: 7,
//         question: "What's your relationship with social media as a couple?",
//         options: [
//           { id: 'a', text: "We share openly about our relationship", trait: "romanticIdealist" },
//           { id: 'b', text: "We keep our relationship private", trait: "fearfulAvoidant" },
//           { id: 'c', text: "We don't really think about it", trait: "practicalRealist" },
//           { id: 'd', text: "We have different approaches", trait: "practicalRealist" }
//         ]
//       },
//       {
//         id: 8,
//         question: "How do you feel about big gestures vs. little everyday kindness?",
//         options: [
//           { id: 'a', text: "Big gestures mean more", trait: "romanticIdealist" },
//           { id: 'b', text: "Little everyday things matter most", trait: "caregiverNurturer" },
//           { id: 'c', text: "Both have their place", trait: "practicalRealist" },
//           { id: 'd', text: "It's the thought that counts", trait: "caregiverNurturer" }
//         ]
//       },
//       {
//         id: 9,
//         question: "What’s something small I do that always makes you smile?",
//         options: [
//           { id: 'a', text: "Your random dance moves", trait: "romanticIdealist" },
//           { id: 'b', text: "Your thoughtful texts", trait: "caregiverNurturer" },
//           { id: 'c', text: "How you say my name", trait: "romanticIdealist" },
//           { id: 'd', text: "Your dramatic storytelling", trait: "romanticIdealist" }
//         ]
//       },
//       {
//         id: 10,
//         question: "What kind of future adventure excites you most with me?",
//         options: [
//           { id: 'a', text: "Backpacking somewhere new", trait: "romanticIdealist" },
//           { id: 'b', text: "Building a cozy home together", trait: "caregiverNurturer" },
//           { id: 'c', text: "Starting a project together", trait: "practicalRealist" },
//           { id: 'd', text: "Traveling without a plan", trait: "romanticIdealist" }
//         ]
//       },
//       {
//         id: 11,
//         question: "If we had a couple’s motto, what would it be?",
//         options: [
//           { id: 'a', text: "Teamwork makes the dream work", trait: "practicalRealist" },
//           { id: 'b', text: "Laugh through the chaos", trait: "romanticIdealist" },
//           { id: 'c', text: "One step at a time", trait: "practicalRealist" },
//           { id: 'd', text: "Ride or die", trait: "romanticIdealist" }
//         ]
//       },
//       {
//         id: 12,
//         question: "What’s your go-to way to reconnect when we feel distant?",
//         options: [
//           { id: 'a', text: "Go for a walk and talk", trait: "practicalRealist" },
//           { id: 'b', text: "Cuddle up and stay quiet", trait: "caregiverNurturer" },
//           { id: 'c', text: "Send a thoughtful message", trait: "caregiverNurturer" },
//           { id: 'd', text: "Do something silly together", trait: "romanticIdealist" }
//         ]
//       },
//       {
//         id: 13,
//         question: "Which ‘us’ moment do you replay most in your head?",
//         options: [
//           { id: 'a', text: "Our first deep conversation", trait: "romanticIdealist" },
//           { id: 'b', text: "Our silliest argument", trait: "practicalRealist" },
//           { id: 'c', text: "A moment we both cried", trait: "caregiverNurturer" },
//           { id: 'd', text: "A completely random memory", trait: "romanticIdealist" }
//         ]
//       },
//       {
//         id: 14,
//         question: "How do you feel about discussing finances together?",
//         options: [
//           { id: 'a', text: "I’m comfortable and open", trait: "practicalRealist" },
//           { id: 'b', text: "Still learning, but willing", trait: "practicalRealist" },
//           { id: 'c', text: "Man should do it", trait: "fearfulAvoidant" },
//           { id: 'd', text: "Rather have clear boundaries", trait: "fearfulAvoidant" }
//         ]
//       },
//       {
//         id: 15,
//         question: "How would you describe our intimacy vibe?",
//         options: [
//           { id: 'a', text: "Spontaneous and fun", trait: "romanticIdealist" },
//           { id: 'b', text: "Slow and intentional", trait: "caregiverNurturer" },
//           { id: 'c', text: "Evolving with time", trait: "practicalRealist" },
//           { id: 'd', text: "Comfortable and cozy", trait: "caregiverNurturer" }
//         ]
//       },
//       {
//         id: 16,
//         question: "What's something you wish we did more often?",
//         options: [
//           { id: 'a', text: "Laugh till we cry", trait: "romanticIdealist" },
//           { id: 'b', text: "Cook together", trait: "caregiverNurturer" },
//           { id: 'c', text: "Go tech-free for a while", trait: "practicalRealist" },
//           { id: 'd', text: "Celebrate small wins", trait: "caregiverNurturer" }
//         ]
//       },
//       {
//         id: 17,
//         question: "If our love story was a genre, what would it be?",
//         options: [
//           { id: 'a', text: "Romantic comedy", trait: "romanticIdealist" },
//           { id: 'b', text: "Drama with a happy ending", trait: "romanticIdealist" },
//           { id: 'c', text: "Adventure fantasy", trait: "romanticIdealist" },
//           { id: 'd', text: "Mystery but make it romantic", trait: "romanticIdealist" }
//         ]
//       },
//       {

//       id: 18,
//       question: "What drives your connection most?",
//       options: [
//     { id: 'a', text: "Shared life goals", trait: "practicalRealist" },
//     { id: 'b', text: "Spontaneous joy and fun", trait: "romanticIdealist" },
//     { id: 'c', text: "The ability to grow individually and together", trait: "fearfulAvoidant" },
//     { id: 'd', text: "Unspoken understanding and care", trait: "caregiverNurturer" }
//   ]
// },

//     {
//       id: 19,
//       question: "How do you feel about having couple goals on social media?",
//       options: [
//         { id: 'a', text: "Love sharing them", trait: "romanticIdealist" },
//         { id: 'b', text: "Rather keep it private", trait: "fearfulAvoidant" },
//         { id: 'c', text: "A little of both", trait: "practicalRealist" },
//         { id: 'd', text: "Don’t care much either way", trait: "practicalRealist" }
//       ]
//     },
//     {
//       id: 20,
//       question: "What's your idea of 'quality time'?",
//       options: [
//         { id: 'a', text: "Deep talks without distractions", trait: "caregiverNurturer" },
//         { id: 'b', text: "Doing hobbies together", trait: "practicalRealist" },
//         { id: 'c', text: "Watching shows side by side", trait: "caregiverNurturer" },
//         { id: 'd', text: "Trying new things as a team", trait: "romanticIdealist" }
//       ]
//     },
//     {
//       id: 21,
//       question: "How important are anniversaries to you?",
//       options: [
//         { id: 'a', text: "Very important", trait: "romanticIdealist" },
//         { id: 'b', text: "Nice, but not everything", trait: "practicalRealist" },
//         { id: 'c', text: "A reason to celebrate big", trait: "romanticIdealist" },
//         { id: 'd', text: "Rather keep it simple", trait: "practicalRealist" }
//       ]
//     },
//     {
//       id: 22,
//       question: "What do you think is our relationship's superpower?",
//       options: [
//         { id: 'a', text: "Communication", trait: "practicalRealist" },
//         { id: 'b', text: "Humor", trait: "romanticIdealist" },
//         { id: 'c', text: "Trust", trait: "caregiverNurturer" },
//         { id: 'd', text: "Shared goals", trait: "practicalRealist" }
//       ]
//     },
//     {
//       id: 23,
//       question: "Which of these is hardest for you to say?",
//       options: [
//         { id: 'a', text: "I need help.", trait: "fearfulAvoidant" },
//         { id: 'b', text: "I’m sorry.", trait: "practicalRealist" },
//         { id: 'c', text: "I’m scared.", trait: "fearfulAvoidant" },
//         { id: 'd', text: "I love you.", trait: "fearfulAvoidant" }
//       ]
//     },
//     {
//       id: 24,
//       question: "What’s the most underrated part of our relationship?",
//       options: [
//         { id: 'a', text: "The little daily routines", trait: "caregiverNurturer" },
//         { id: 'b', text: "The way we cheer each other on", trait: "caregiverNurturer" },
//         { id: 'c', text: "The quiet understanding", trait: "practicalRealist" },
//         { id: 'd', text: "The silliness we share", trait: "romanticIdealist" }
//       ]
//     },
//     {
//       id: 25,
//       question: "How do you feel about traveling together?",
//       options: [
//         { id: 'a', text: "Love it—best way to bond", trait: "romanticIdealist" },
//         { id: 'b', text: "Enjoy it occasionally", trait: "practicalRealist" },
//         { id: 'c', text: "Prefer solo trips sometimes", trait: "fearfulAvoidant" },
//         { id: 'd', text: "Haven’t done it much yet", trait: "practicalRealist" }
//       ]
//     },
//     {
//       id: 26,
//       question: "How do you feel about planning for the long term?",
//       options: [
//         { id: 'a', text: "Excited to build together", trait: "romanticIdealist" },
//         { id: 'b', text: "Prefer to take it day by day", trait: "practicalRealist" },
//         { id: 'c', text: "A mix of both", trait: "practicalRealist" },
//         { id: 'd', text: "Still figuring it out", trait: "fearfulAvoidant" }
//       ]
//     },
//     {
//       id: 27,
//       question: "When you’re feeling disconnected, what helps?",
//       options: [
//         { id: 'a', text: "Talking it out", trait: "practicalRealist" },
//         { id: 'b', text: "Spending focused time together", trait: "caregiverNurturer" },
//         { id: 'c', text: "Small gestures of love", trait: "caregiverNurturer" },
//         { id: 'd', text: "Space to reflect", trait: "fearfulAvoidant" }
//       ]
//     },
//     {
//       id: 28,
//       question: "How do you feel about expressing emotions?",
//       options: [
//         { id: 'a', text: "I’m an open book", trait: "romanticIdealist" },
//         { id: 'b', text: "I share when I’m ready", trait: "caregiverNurturer" },
//         { id: 'c', text: "I prefer actions over words", trait: "practicalRealist" },
//         { id: 'd', text: "I find it challenging sometimes", trait: "fearfulAvoidant" }
//       ]
//     },
//     {
//       id: 29,
//       question: "How do you feel about traditions and rituals?",
//       options: [
//         { id: 'a', text: "Love creating them", trait: "romanticIdealist" },
//         { id: 'b', text: "Like some, but not too many", trait: "practicalRealist" },
//         { id: 'c', text: "Prefer spontaneity", trait: "romanticIdealist" },
//         { id: 'd', text: "Haven’t thought about it", trait: "practicalRealist" }
//       ]
//     },
//     {
//       id: 30,
//       question: "What’s the sweetest thing I do without realizing?",
//       options: [
//         { id: 'a', text: "The way you look at me", trait: "romanticIdealist" },
//         { id: 'b', text: "Your random acts of kindness", trait: "caregiverNurturer" },
//         { id: 'c', text: "Your goofy side", trait: "romanticIdealist" },
//         { id: 'd', text: "The way you believe in me", trait: "caregiverNurturer" }
//       ]
//     }
//   ],
  
//    mcq1: 
//   [
//     {
//       id: 1,
//       question: "When you imagine us many years from now, what do you hope we'll still be doing together?",
//       options: [
//         { id: 'a', text: "Laughing over inside jokes", trait: "romanticIdealist" },
//         { id: 'b', text: "Cooking meals together", trait: "caregiverNurturer" },
//         { id: 'c', text: "Traveling to new places", trait: "romanticIdealist" },
//         { id: 'd', text: "Supporting each other’s dreams", trait: "caregiverNurturer" }
//       ]
//     },
//     {
//       id: 2,
//       question: "What's one area where you'd like us to grow as a couple?",
//       options: [
//         { id: 'a', text: "Communication during conflict", trait: "practicalRealist" },
//         { id: 'b', text: "Trying new things together", trait: "romanticIdealist" },
//         { id: 'c', text: "Balancing independence and time together", trait: "fearfulAvoidant" },
//         { id: 'd', text: "Understanding each other’s emotional needs", trait: "caregiverNurturer" }
//       ]
//     },
//     {
//       id: 3,
//       question: "What do you think our biggest strengths are as a team?",
//       options: [
//         { id: 'a', text: "We lift each other up", trait: "caregiverNurturer" },
//         { id: 'b', text: "We always have fun together", trait: "romanticIdealist" },
//         { id: 'c', text: "We get through challenges", trait: "practicalRealist" },
//         { id: 'd', text: "We’re open and honest", trait: "practicalRealist" }
//       ]
//     },
//     {
//       id: 4,
//       question: "What's something you're still curious to learn about me?",
//       options: [
//         { id: 'a', text: "Your childhood stories", trait: "caregiverNurturer" },
//         { id: 'b', text: "Your secret dreams", trait: "romanticIdealist" },
//         { id: 'c', text: "What makes you feel most loved", trait: "caregiverNurturer" },
//         { id: 'd', text: "Your deepest fears", trait: "fearfulAvoidant" }
//       ]
//     },
//     {
//       id: 5,
//       question: "What's one little ritual or habit of ours that you hope never changes?",
//       options: [
//         { id: 'a', text: "Goodnight texts or kisses", trait: "caregiverNurturer" },
//         { id: 'b', text: "Random check-in messages", trait: "caregiverNurturer" },
//         { id: 'c', text: "Our silly jokes", trait: "romanticIdealist" },
//         { id: 'd', text: "Morning routines together", trait: "practicalRealist" }
//       ]
//     },
//     {
//       id: 6,
//       question: "How do you feel about our balance between routine and adventure?",
//       options: [
//         { id: 'a', text: "Love the stability", trait: "practicalRealist" },
//         { id: 'b', text: "Wish for a little more excitement", trait: "romanticIdealist" },
//         { id: 'c', text: "It’s just right", trait: "practicalRealist" },
//         { id: 'd', text: "Let’s shake things up sometimes!", trait: "romanticIdealist" }
//       ]
//     },
//     {
//       id: 7,
//       question: "What's one dream or goal you haven't shared with me yet?",
//       options: [
//         { id: 'a', text: "Starting something creative together", trait: "romanticIdealist" },
//         { id: 'b', text: "A big move or travel adventure", trait: "romanticIdealist" },
//         { id: 'c', text: "Building something long-term", trait: "practicalRealist" },
//         { id: 'd', text: "A personal growth goal", trait: "fearfulAvoidant" }
//       ]
//     },
//     {
//       id: 8,
//       question: "What's something you appreciate more about me now than you did early on?",
//       options: [
//         { id: 'a', text: "Your patience", trait: "caregiverNurturer" },
//         { id: 'b', text: "Your sense of humor", trait: "romanticIdealist" },
//         { id: 'c', text: "How deeply you care", trait: "caregiverNurturer" },
//         { id: 'd', text: "Your ability to adapt", trait: "practicalRealist" }
//       ]
//     },
//     {
//       id: 9,
//       question: "If we could design our ideal day together, what would it look like?",
//       options: [
//         { id: 'a', text: "Lazy morning, good food, and cuddles", trait: "caregiverNurturer" },
//         { id: 'b', text: "Exploring a new place", trait: "romanticIdealist" },
//         { id: 'c', text: "Laughing and playing games", trait: "romanticIdealist" },
//         { id: 'd', text: "Meaningful conversations and sunset walks", trait: "romanticIdealist" }
//       ]
//     },
//     {
//       id: 10,
//       question: "What do you think helps keep our connection strong over time?",
//       options: [
//         { id: 'a', text: "Staying honest", trait: "practicalRealist" },
//         { id: 'b', text: "Making time for each other", trait: "caregiverNurturer" },
//         { id: 'c', text: "Being silly and light", trait: "romanticIdealist" },
//         { id: 'd', text: "Listening without judgment", trait: "caregiverNurturer" }
//       ]
//     },
//       {
//         id: 11,
//         question: "What's something you'd love to try together that we haven't done yet?",
//         options: [
//           { id: 'a', text: "A cooking or art class", trait: "romanticIdealist" },
//           { id: 'b', text: "A spontaneous road trip", trait: "romanticIdealist" },
//           { id: 'c', text: "Volunteering for a cause", trait: "caregiverNurturer" },
//           { id: 'd', text: "A wellness retreat", trait: "practicalRealist" }
//         ]
//       },
//       {
//         id: 12,
//         question: "When you think about the tough times we've faced, what helped us get through them?",
//         options: [
//           { id: 'a', text: "Our honest conversations", trait: "practicalRealist" },
//           { id: 'b', text: "Staying committed", trait: "caregiverNurturer" },
//           { id: 'c', text: "Laughing when we could", trait: "romanticIdealist" },
//           { id: 'd', text: "Giving each other space", trait: "fearfulAvoidant" }
//         ]
//       },
//       {
//         id: 13,
//         question: "How do you feel about how we express affection lately?",
//         options: [
//           { id: 'a', text: "It feels just right", trait: "practicalRealist" },
//           { id: 'b', text: "I’d love a little more physical closeness", trait: "caregiverNurturer" },
//           { id: 'c', text: "I’d like more words of love", trait: "romanticIdealist" },
//           { id: 'd', text: "I appreciate the small gestures most", trait: "practicalRealist" }
//         ]
//       },
//       {
//         id: 14,
//         question: "What helps you feel most secure in our relationship?",
//         options: [
//           { id: 'a', text: "Consistency and trust", trait: "practicalRealist" },
//           { id: 'b', text: "Affection and closeness", trait: "caregiverNurturer" },
//           { id: 'c', text: "Knowing we share the same goals", trait: "practicalRealist" },
//           { id: 'd', text: "Open communication", trait: "practicalRealist" }
//         ]
//       },
//       {
//         id: 15,
//         question: "If we could learn a new skill or hobby as a couple, what would you pick?",
//         options: [
//           { id: 'a', text: "Dance lessons", trait: "romanticIdealist" },
//           { id: 'b', text: "Gardening", trait: "caregiverNurturer" },
//           { id: 'c', text: "Photography", trait: "romanticIdealist" },
//           { id: 'd', text: "Cooking new cuisines", trait: "romanticIdealist" }
//         ]
//       },
//       {
//         id: 16,
//         question: "What’s something small I do that always makes your day brighter?",
//         options: [
//           { id: 'a', text: "Your smile", trait: "romanticIdealist" },
//           { id: 'b', text: "Your little notes or messages", trait: "caregiverNurturer" },
//           { id: 'c', text: "Your random acts of kindness", trait: "caregiverNurturer" },
//           { id: 'd', text: "Your silly humor", trait: "romanticIdealist" }
//         ]
//       },
//       {
//         id: 17,
//         question: "When you imagine growing old with me, what do you see?",
//         options: [
//           { id: 'a', text: "Traveling in retirement", trait: "romanticIdealist" },
//           { id: 'b', text: "Relaxing together at home", trait: "practicalRealist" },
//           { id: 'c', text: "Hosting family gatherings", trait: "caregiverNurturer" },
//           { id: 'd', text: "Learning and growing side by side", trait: "practicalRealist" }
//         ]
//       },
//       {
//         id: 18,
//         question: "What’s a dream trip you’d love us to take together?",
//         options: [
//           { id: 'a', text: "Exploring Europe", trait: "romanticIdealist" },
//           { id: 'b', text: "A tropical island getaway", trait: "romanticIdealist" },
//           { id: 'c', text: "A road trip across the country", trait: "romanticIdealist" },
//           { id: 'd', text: "A wilderness adventure", trait: "romanticIdealist" }
//         ]
//       },
//       {
//         id: 19,
//         question: "What do you think makes our bond unique?",
//         options: [
//           { id: 'a', text: "Our shared humor", trait: "romanticIdealist" },
//           { id: 'b', text: "How we support each other", trait: "caregiverNurturer" },
//           { id: 'c', text: "The way we communicate", trait: "practicalRealist" },
//           { id: 'd', text: "Our shared vision", trait: "practicalRealist" }
//         ]
//       },
//       {
//         id: 20,
//         question: "What’s something you’d love us to learn together?",
//         options: [
//           { id: 'a', text: "A new language", trait: "romanticIdealist" },
//           { id: 'b', text: "A sport or activity", trait: "romanticIdealist" },
//           { id: 'c', text: "An instrument", trait: "romanticIdealist" },
//           { id: 'd', text: "Mindfulness practices", trait: "practicalRealist" }
//         ]
//       },
//       {
//         id: 21,
//         question: "What’s your favorite memory of us so far?",
//         options: [
//           { id: 'a', text: "Our first trip together", trait: "romanticIdealist" },
//           { id: 'b', text: "A special celebration", trait: "romanticIdealist" },
//           { id: 'c', text: "A quiet moment", trait: "caregiverNurturer" },
//           { id: 'd', text: "Something unexpected we handled well", trait: "practicalRealist" }
//         ]
//       },
//       {
//         id: 22,
//         question: "How do you feel most appreciated by me?",
//         options: [
//           { id: 'a', text: "Hearing words of affirmation", trait: "romanticIdealist" },
//           { id: 'b', text: "Small gestures and surprises", trait: "caregiverNurturer" },
//           { id: 'c', text: "Quality time together", trait: "caregiverNurturer" },
//           { id: 'd', text: "Physical affection", trait: "caregiverNurturer" }
//         ]
//       },
//       {
//         id: 23,
//         question: "What’s one thing we could do more often to stay connected?",
//         options: [
//           { id: 'a', text: "Date nights", trait: "romanticIdealist" },
//           { id: 'b', text: "Deep conversations", trait: "caregiverNurturer" },
//           { id: 'c', text: "Trying new activities", trait: "romanticIdealist" },
//           { id: 'd', text: "Unplugged time", trait: "practicalRealist" }
//         ]
//       },
//       {
//         id: 24,
//         question: "What are you most proud of about our relationship?",
//         options: [
//           { id: 'a', text: "How we’ve grown together", trait: "practicalRealist" },
//           { id: 'b', text: "How we handle challenges", trait: "practicalRealist" },
//           { id: 'c', text: "How much we laugh", trait: "romanticIdealist" },
//           { id: 'd', text: "The trust we’ve built", trait: "caregiverNurturer" }
//         ]
//       },
//       {
//         id: 25,
//         question: "What helps you feel most loved?",
//         options: [
//           { id: 'a', text: "Words of love", trait: "romanticIdealist" },
//           { id: 'b', text: "Thoughtful actions", trait: "caregiverNurturer" },
//           { id: 'c', text: "Time and attention", trait: "caregiverNurturer" },
//           { id: 'd', text: "Physical closeness", trait: "caregiverNurturer" }
//         ]
//       },
//       {
//         id: 26,
//         question: "What’s something you want us to build or create together?",
//         options: [
//           { id: 'a', text: "A cozy home", trait: "caregiverNurturer" },
//           { id: 'b', text: "A shared project", trait: "romanticIdealist" },
//           { id: 'c', text: "A family", trait: "caregiverNurturer" },
//           { id: 'd', text: "A business or cause", trait: "practicalRealist" }
//         ]
//       },
//       {
//         id: 27,
//         question: "When do you feel closest to me?",
//         options: [
//           { id: 'a', text: "During quiet moments", trait: "caregiverNurturer" },
//           { id: 'b', text: "When we’re laughing", trait: "romanticIdealist" },
//           { id: 'c', text: "When we face challenges together", trait: "practicalRealist" },
//           { id: 'd', text: "When we’re affectionate", trait: "caregiverNurturer" }
//         ]
//       },
//       {
//         id: 28,
//         question: "What’s something you’d love to hear me say more often?",
//         options: [
//           { id: 'a', text: "I appreciate you", trait: "caregiverNurturer" },
//           { id: 'b', text: "I’m proud of you", trait: "caregiverNurturer" },
//           { id: 'c', text: "I love you", trait: "romanticIdealist" },
//           { id: 'd', text: "I’m here for you", trait: "caregiverNurturer" }
//         ]
//       },
//       {
//         id: 29,
//         question: "What’s one thing you want us to promise each other?",
//         options: [
//           { id: 'a', text: "To always be honest", trait: "practicalRealist" },
//           { id: 'b', text: "To never stop growing", trait: "practicalRealist" },
//           { id: 'c', text: "To always have each other’s backs", trait: "caregiverNurturer" },
//           { id: 'd', text: "To keep the fun alive", trait: "romanticIdealist" }
//         ]
//       },
//       {
//         id: 30,
//         question: "What does home feel like to you with me?",
//         options: [
//           { id: 'a', text: "Safe and steady", trait: "practicalRealist" },
//           { id: 'b', text: "Warm and loving", trait: "caregiverNurturer" },
//           { id: 'c', text: "Playful and fun", trait: "romanticIdealist" },
//           { id: 'd', text: "Full of possibility", trait: "romanticIdealist" }
//         ]
//       },
//       {
//         id: 31,
//         question: "What’s something you hope never changes between us?",
//         options: [
//           { id: 'a', text: "Our trust", trait: "practicalRealist" },
//           { id: 'b', text: "Our laughter", trait: "romanticIdealist" },
//           { id: 'c', text: "Our closeness", trait: "caregiverNurturer" },
//           { id: 'd', text: "Our curiosity about each other", trait: "romanticIdealist" }
//         ]
//       },
//       {
//         id: 32,
//         question: "What’s one way we could be even better as a team?",
//         options: [
//           { id: 'a', text: "More open communication", trait: "practicalRealist" },
//           { id: 'b', text: "More shared goals", trait: "practicalRealist" },
//           { id: 'c', text: "More adventure together", trait: "romanticIdealist" },
//           { id: 'd', text: "More quality time", trait: "caregiverNurturer" }
//         ]
//       },
//     {
//       id: 33,
//       question: "Which date feels most like ‘us’?",
//       options: [
//         { id: 'a', text: "Picnic in the park under the stars", trait: "romanticIdealist" },
//         { id: 'b', text: "Attending a personal growth workshop", trait: "practicalRealist" },
//         { id: 'c', text: "Cooking together at home", trait: "caregiverNurturer" },
//         { id: 'd', text: "Watching a movie in silence but feeling understood", trait: "fearfulAvoidant" }
//       ]
//     },
//     {
//       id: 34,
//       question: "What emotional need do you crave most in a partner?",
//       options: [
//         { id: 'a', text: "Reassurance and presence", trait: "caregiverNurturer" },
//         { id: 'b', text: "Freedom to be myself", trait: "fearfulAvoidant" },
//         { id: 'c', text: "Support in achieving goals", trait: "practicalRealist" },
//         { id: 'd', text: "Shared wonder and romance", trait: "romanticIdealist" }
//       ]
//     },
//       {
//         id: 35,
//         question: "What’s something you’re excited for in our future?",
//         options: [
//           { id: 'a', text: "Traveling together", trait: "romanticIdealist" },
//           { id: 'b', text: "Building our dreams", trait: "practicalRealist" },
//           { id: 'c', text: "Growing old together", trait: "romanticIdealist" },
//           { id: 'd', text: "Discovering new things about each other", trait: "romanticIdealist" }
//         ]
//       }
//     ]  
//   };

// const compatibilityProfiles = {
//   romanticIdealist: {
//     name: "Romantic Idealist",
//     emoji: "💖",
//     color: "text-pink-400",
//     description: "You dream of deep, soulful connections and grand love stories. You believe in magic, serendipity, and the power of emotion."
//   },
//   practicalRealist: {
//     name: "Practical Realist",
//     emoji: "🛠️",
//     color: "text-amber-400",
//     description: "You're grounded, thoughtful, and believe strong relationships are built on consistency, effort, and trust."
//   },
//   fearfulAvoidant: {
//     name: "Fearful Avoidant",
//     emoji: "😟",
//     color: "text-blue-400",
//     description: "You value connection but fear vulnerability. You seek love cautiously and need space and trust to open up."
//   },
//   caregiverNurturer: {
//     name: "Caregiver / Nurturer",
//     emoji: "🌿",
//     color: "text-green-400",
//     description: "You lead with empathy and kindness. You thrive in emotionally rich, supportive relationships where care flows both ways."
//   }
// };

// export default function MatchQuiz() {
//   const navigate = useNavigate();
//   const { user } = useAuth();
  
//   // State management
//   const [quizState, setQuizState] = useState({
//     currentQuestion: 0,
//     answers: {},
//     isComplete: false,
//     results: null,
//     quizQuestions: [],
//     hasPreviousResult: false,
//     previousResult: null,
//     showQuiz: false,
//     loading: true,
//     error: null,
//     questionsReady: false // New state to track question readiness
//   });

//   // Generate quiz questions function
//   const generateQuizQuestions = () => {
//     try {
//       const randomMCQs = [...questionPool.mcq]
//         .sort(() => 0.5 - Math.random())
//         .slice(0, 6);

//       const randomMCQ1 = [...questionPool.mcq1]
//         .sort(() => 0.5 - Math.random())
//         .slice(0, 4);

//       const allQuestions = [];
//       let mcqIndex = 0;
//       let mcq1Index = 0;

//       for (let i = 0; i < 10; i++) {
//         if ((i < 6 && Math.random() > 0.5) || mcq1Index >= 4) {
//           if (mcqIndex < 6) {
//             allQuestions.push({ ...randomMCQs[mcqIndex++], type: "mcq" });
//           }
//         } else {
//           if (mcq1Index < 4) {
//             allQuestions.push({ ...randomMCQ1[mcq1Index++], type: "mcq1" });
//           }
//         }
//       }

//       while (allQuestions.length < 10) {
//         if (mcqIndex < 6) {
//           allQuestions.push({ ...randomMCQs[mcqIndex++], type: "mcq" });
//         } else if (mcq1Index < 4) {
//           allQuestions.push({ ...randomMCQ1[mcq1Index++], type: "mcq1" });
//         }
//       }

//       return allQuestions;
//     } catch (error) {
//       console.error("Error generating questions:", error);
//       return []; // Return empty array if generation fails
//     }
//   };

//   // Check for previous results on mount
//   useEffect(() => {
//     const checkPreviousResult = async () => {
//       try {
//         if (user?.uid) {
//           const quizRef = doc(db, "users", user.uid, "compatibilityQuiz", "result");
//           const docSnap = await getDoc(quizRef);
          
//           setQuizState(prev => ({
//             ...prev,
//             hasPreviousResult: docSnap.exists(),
//             previousResult: docSnap.exists() ? docSnap.data() : null,
//             showQuiz: !docSnap.exists(),
//             loading: false
//           }));
//         }
//       } catch (err) {
//         console.error("Error checking previous result:", err);
//         setQuizState(prev => ({
//           ...prev,
//           error: "Couldn't load previous results. You can still take a new quiz.",
//           showQuiz: true,
//           loading: false
//         }));
//       }
//     };

//     checkPreviousResult();
//   }, [user]);

//   // Generate questions when needed
//   useEffect(() => {
//     if (quizState.showQuiz && quizState.quizQuestions.length === 0 && !quizState.questionsReady) {
//       const newQuestions = generateQuizQuestions();
//       setQuizState(prev => ({
//         ...prev,
//         quizQuestions: newQuestions,
//         questionsReady: newQuestions.length > 0
//       }));
//     }
//   }, [quizState.showQuiz, quizState.questionsReady]);

//   // Start new quiz function
//   const startNewQuiz = () => {
//     const newQuestions = generateQuizQuestions();
//     setQuizState({
//       currentQuestion: 0,
//       answers: {},
//       isComplete: false,
//       results: null,
//       quizQuestions: newQuestions,
//       hasPreviousResult: false,
//       previousResult: null,
//       showQuiz: true,
//       loading: false,
//       error: null,
//       questionsReady: newQuestions.length > 0
//     });
//   };

//   // Handle answer selection
//   const handleAnswer = (questionId, answer) => {
//     setQuizState(prev => ({
//       ...prev,
//       answers: {
//         ...prev.answers,
//         [questionId]: answer
//       }
//     }));
    
//     setTimeout(() => {
//       if (quizState.currentQuestion < quizState.quizQuestions.length - 1) {
//         setQuizState(prev => ({
//           ...prev,
//           currentQuestion: prev.currentQuestion + 1
//         }));
//       } else {
//         calculateResults();
//       }
//     }, 300);
//   };

//   // Calculate and save results
//   const calculateResults = async () => {
//     try {
//       const traitCounts = {};
//       Object.values(quizState.answers).forEach((answer) => {
//         traitCounts[answer.trait] = (traitCounts[answer.trait] || 0) + 1;
//       });

//       const dominantTrait = Object.keys(traitCounts).reduce((a, b) =>
//         traitCounts[a] > traitCounts[b] ? a : b
//       );

//       const profile = compatibilityProfiles[dominantTrait];
//       const compatibleTraits = getCompatibleTraits(dominantTrait);

//       const resultData = {
//         timestamp: new Date(),
//         answers: quizState.answers,
//         primaryTrait: dominantTrait,
//         result: profile.name
//       };

//       try {
//         const { uid } = user;
//         const quizRef = doc(db, "users", uid, "compatibilityQuiz", "result");
//         await setDoc(quizRef, resultData);
//       } catch (err) {
//         console.error("❌ Error saving quiz result:", err);
//         throw err;
//       }

//       setQuizState(prev => ({
//         ...prev,
//         isComplete: true,
//         results: {
//           primaryProfile: { ...profile, trait: dominantTrait },
//           compatibleProfiles: compatibleTraits.map((trait) => ({
//             ...compatibilityProfiles[trait],
//             trait,
//             compatibility: Math.floor(Math.random() * 20) + 80
//           }))
//         }
//       }));
//     } catch (error) {
//       console.error("Error calculating results:", error);
//       setQuizState(prev => ({
//         ...prev,
//         error: "Couldn't calculate results. Please try again."
//       }));
//     }
//   };

//   // Get compatible traits
//   const getCompatibleTraits = (trait) => {
//     const compatibilityMap = {
//       romanticIdealist: ["caregiverNurturer"],
//       practicalRealist: ["practicalRealist"],
//       fearfulAvoidant: ["caregiverNurturer"],
//       caregiverNurturer: ["romanticIdealist"]
//     };
//     return compatibilityMap[trait] || [];
//   };

//   // Loading state
//   if (quizState.loading) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center text-pink-500">
//         Loading...
//       </div>
//     );
//   }

//   // Error state
//   if (quizState.error) {
//     return (
//       <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
//         <div className="max-w-md text-center">
//           <p className="text-red-400 mb-4">{quizState.error}</p>
//           <button
//             onClick={() => setQuizState(prev => ({ ...prev, error: null }))}
//             className="px-6 py-3 bg-pink-500 rounded-full"
//           >
//             Continue
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Show previous results if they exist
//   if (quizState.hasPreviousResult && !quizState.showQuiz && !quizState.isComplete) {
//     const profile = compatibilityProfiles[quizState.previousResult.primaryTrait];
//     const compatibleTraits = getCompatibleTraits(quizState.previousResult.primaryTrait);
    
//     return (
// <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-4 py-12">
//   <div className="p-6 max-w-2xl mx-auto text-center border border-pink-700/50 rounded-2xl bg-black/40 backdrop-blur-sm shadow-xl">
//     <h1 className="text-4xl font-extrabold mb-6 text-pink-400">Your Connection Profile ✨</h1>

//     <h3 className="mt-6 text-xl font-semibold text-pink-300">
//       You resonate most with
//     </h3>

//     <div className="flex justify-center mt-6">
//       {compatibleTraits.slice(0, 1).map((trait) => {
//         const compatibleProfile = compatibilityProfiles[trait];
//         return (
//           <div
//             key={trait}
//             className="bg-pink-900/20 p-6 rounded-xl border border-pink-500 w-80 text-center shadow-lg"
//           >
//             <div className="text-4xl mb-2">{compatibleProfile.emoji}</div>
//             <div className="text-xl font-bold">{compatibleProfile.name}</div>
//             <div className="text-pink-400 text-sm mt-1">
//               {Math.floor(Math.random() * 20) + 80}% compatibility
//             </div>
//             <p className="text-sm text-gray-300 mt-4 italic">
//               {compatibleProfile.description}
//             </p>
//           </div>
//         );
//       })}
//     </div>
  
          
//           <div className="mt-8 flex flex-col space-y-4">
//             <button
//               onClick={startNewQuiz}
//               className="px-6 py-3 bg-pink-500 rounded-full"
//             >
//               Retake Quiz
//             </button>
//             <button
//               onClick={() => navigate("/dashboard")}
//               className="px-6 py-3 bg-gray-700 rounded-full"
//             >
//               Back to Dashboard
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Show quiz results if complete
// if (quizState.isComplete && quizState.results) {
//   const bestMatch = quizState.results.compatibleProfiles[0];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-4 py-10">
//       {quizState.error && (
//         <div className="bg-red-900/50 p-4 text-center rounded-md mb-4 border border-red-700 max-w-xl mx-auto">
//           {quizState.error}
//         </div>
//       )}

//       <div className="p-6 max-w-2xl mx-auto text-center border border-pink-700/50 rounded-2xl bg-black/40 backdrop-blur-sm shadow-xl">
//         <h1 className="text-4xl font-extrabold mb-6 text-pink-400">Your Result ✨</h1>

//         <h3 className="mt-6 text-xl font-semibold text-pink-300">
//           You resonate most with
//         </h3>

//         <div className="flex justify-center mt-6">
//           <div
//             className="bg-pink-900/20 p-6 rounded-xl border border-pink-500 w-80 text-center shadow-lg"
//           >
//             <div className="text-4xl mb-2">{bestMatch.emoji}</div>
//             <div className="text-xl font-bold">{bestMatch.name}</div>
//             <div className="text-pink-400 text-sm mt-1">
//               {bestMatch.compatibility}% compatibility
//             </div>
//             <p className="text-sm text-gray-300 mt-4 italic">
//               {bestMatch.description}
//             </p>
//           </div>
//         </div>

//         <div className="mt-10 flex flex-col space-y-4">
//           <button
//             onClick={() => navigate("/dashboard")}
//             className="px-6 py-3 bg-pink-500 hover:bg-pink-600 rounded-full font-medium transition duration-200"
//           >
//             Back to Dashboard
//           </button>
//           <button
//             onClick={startNewQuiz}
//             className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-full font-medium transition duration-200"
//           >
//             Retake Quiz
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


//   // Show loading if questions aren't ready
//   if (!quizState.showQuiz || !quizState.questionsReady || quizState.quizQuestions.length === 0) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center text-pink-500">
//         Loading questions...
//       </div>
//     );
//   }

//   // Safely get current question
//   const currentQ = quizState.quizQuestions[quizState.currentQuestion];
//   if (!currentQ) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center text-pink-500">
//         Error loading question. Please try again.
//       </div>
//     );
//   }

//   // Show current question
//   return (
//     <div className="min-h-screen bg-black text-white p-12 max-w-3xl mx-auto">
//       <h1 className="text-3xl text-center mb-12">
//         Soul Connection Quiz 🦋
//       </h1>
//       <p className="mb-8">
//         Question {quizState.currentQuestion + 1} of {quizState.quizQuestions.length}
//       </p>
// <h2 className="text-2xl font-semibold mb-6 border-l-4 border-pink-500 pl-4">
//   {currentQ.question}
// </h2>
// <div className="space-y-4">
//   {currentQ.options.map((option) => (
//     <button
//       key={option.id}
//       onClick={() => handleAnswer(currentQ.id, option)}
//       className="block w-full text-left p-4 bg-gradient-to-r from-pink-700 to-pink-500 hover:brightness-110 rounded-xl border border-pink-300 transition-all duration-200 shadow-md hover:scale-[1.02]"
//     >
//       {option.text}
//     </button>
//   ))}
// </div>

//     </div>
//   );
// }



import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from "../services/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext"; 
import { 
  Heart, 
  ArrowLeft, 
  Stars, 
  Sparkles,
  CheckCircle,
  Users,
  Zap,
  ChevronRight
} from 'lucide-react';
import { Helmet } from 'react-helmet';

// ... (keep all your existing questionPool and compatibilityProfiles objects)
const questionPool = {
  mcq: [
    {
      id: 1,
      question: "How do you usually navigate conflict in a relationship?",
      options: [
        { id: 'a', text: "I shut down and need time alone", trait: "fearfulAvoidant" },
        { id: 'b', text: "I try to work through it logically", trait: "practicalRealist" },
        { id: 'c', text: "I speak my heart openly", trait: "romanticIdealist" },
        { id: 'd', text: "I make sure the other person feels okay first", trait: "caregiverNurturer" }
      ]
    },

      {
        id: 2,
        question: "How can we help each other maintain our individuality while staying connected?",
        options: [
          { id: 'a', text: "Having designated 'me time'", trait: "fearfulAvoidant" },
          { id: 'b', text: "Supporting each other's hobbies", trait: "caregiverNurturer" },
          { id: 'c', text: "Maintaining separate friend groups", trait: "fearfulAvoidant" },
          { id: 'd', text: "Encouraging personal goals", trait: "practicalRealist" }
        ]
      },
      {
        id: 3,
        question: "When you're having a rough day, what's the most comforting thing I can do?",
        options: [
          { id: 'a', text: "Listen without trying to fix it", trait: "caregiverNurturer" },
          { id: 'b', text: "Give you space to process", trait: "fearfulAvoidant" },
          { id: 'c', text: "Distract you with fun activities", trait: "romanticIdealist" },
          { id: 'd', text: "Offer practical solutions", trait: "practicalRealist" }
        ]
      },
      {
        id: 4,
        question: "How do you feel about how we handle disagreements these days?",
        options: [
          { id: 'a', text: "We communicate well and resolve quickly", trait: "practicalRealist" },
          { id: 'b', text: "We could improve our conflict resolution", trait: "practicalRealist" },
          { id: 'c', text: "We avoid conflict sometimes", trait: "fearfulAvoidant" },
          { id: 'd', text: "It depends on the topic", trait: "practicalRealist" }
        ]
      },
      {
        id: 5,
        question: "What's your love language in conflict?",
        options: [
          { id: 'a', text: "Space to cool off", trait: "fearfulAvoidant" },
          { id: 'b', text: "Reassurance and affection", trait: "caregiverNurturer" },
          { id: 'c', text: "Practical solutions", trait: "practicalRealist" },
          { id: 'd', text: "Humor to lighten mood", trait: "romanticIdealist" }
        ]
      },
      {
        id: 6,
        question: "How do you define emotional safety in a relationship?",
        options: [
          { id: 'a', text: "Being able to be completely vulnerable", trait: "caregiverNurturer" },
          { id: 'b', text: "Knowing conflicts will be resolved fairly", trait: "practicalRealist" },
          { id: 'c', text: "Feeling accepted without judgment", trait: "romanticIdealist" },
          { id: 'd', text: "Having complete trust", trait: "romanticIdealist" }
        ]
      },
      {
        id: 7,
        question: "What's your relationship with social media as a couple?",
        options: [
          { id: 'a', text: "We share openly about our relationship", trait: "romanticIdealist" },
          { id: 'b', text: "We keep our relationship private", trait: "fearfulAvoidant" },
          { id: 'c', text: "We don't really think about it", trait: "practicalRealist" },
          { id: 'd', text: "We have different approaches", trait: "practicalRealist" }
        ]
      },
      {
        id: 8,
        question: "How do you feel about big gestures vs. little everyday kindness?",
        options: [
          { id: 'a', text: "Big gestures mean more", trait: "romanticIdealist" },
          { id: 'b', text: "Little everyday things matter most", trait: "caregiverNurturer" },
          { id: 'c', text: "Both have their place", trait: "practicalRealist" },
          { id: 'd', text: "It's the thought that counts", trait: "caregiverNurturer" }
        ]
      },
      {
        id: 9,
        question: "What’s something small I do that always makes you smile?",
        options: [
          { id: 'a', text: "Your random dance moves", trait: "romanticIdealist" },
          { id: 'b', text: "Your thoughtful texts", trait: "caregiverNurturer" },
          { id: 'c', text: "How you say my name", trait: "romanticIdealist" },
          { id: 'd', text: "Your dramatic storytelling", trait: "romanticIdealist" }
        ]
      },
      {
        id: 10,
        question: "What kind of future adventure excites you most with me?",
        options: [
          { id: 'a', text: "Backpacking somewhere new", trait: "romanticIdealist" },
          { id: 'b', text: "Building a cozy home together", trait: "caregiverNurturer" },
          { id: 'c', text: "Starting a project together", trait: "practicalRealist" },
          { id: 'd', text: "Traveling without a plan", trait: "romanticIdealist" }
        ]
      },
      {
        id: 11,
        question: "If we had a couple’s motto, what would it be?",
        options: [
          { id: 'a', text: "Teamwork makes the dream work", trait: "practicalRealist" },
          { id: 'b', text: "Laugh through the chaos", trait: "romanticIdealist" },
          { id: 'c', text: "One step at a time", trait: "practicalRealist" },
          { id: 'd', text: "Ride or die", trait: "romanticIdealist" }
        ]
      },
      {
        id: 12,
        question: "What’s your go-to way to reconnect when we feel distant?",
        options: [
          { id: 'a', text: "Go for a walk and talk", trait: "practicalRealist" },
          { id: 'b', text: "Cuddle up and stay quiet", trait: "caregiverNurturer" },
          { id: 'c', text: "Send a thoughtful message", trait: "caregiverNurturer" },
          { id: 'd', text: "Do something silly together", trait: "romanticIdealist" }
        ]
      },
      {
        id: 13,
        question: "Which ‘us’ moment do you replay most in your head?",
        options: [
          { id: 'a', text: "Our first deep conversation", trait: "romanticIdealist" },
          { id: 'b', text: "Our silliest argument", trait: "practicalRealist" },
          { id: 'c', text: "A moment we both cried", trait: "caregiverNurturer" },
          { id: 'd', text: "A completely random memory", trait: "romanticIdealist" }
        ]
      },
      {
        id: 14,
        question: "How do you feel about discussing finances together?",
        options: [
          { id: 'a', text: "I’m comfortable and open", trait: "practicalRealist" },
          { id: 'b', text: "Still learning, but willing", trait: "practicalRealist" },
          { id: 'c', text: "Man should do it", trait: "fearfulAvoidant" },
          { id: 'd', text: "Rather have clear boundaries", trait: "fearfulAvoidant" }
        ]
      },
      {
        id: 15,
        question: "How would you describe our intimacy vibe?",
        options: [
          { id: 'a', text: "Spontaneous and fun", trait: "romanticIdealist" },
          { id: 'b', text: "Slow and intentional", trait: "caregiverNurturer" },
          { id: 'c', text: "Evolving with time", trait: "practicalRealist" },
          { id: 'd', text: "Comfortable and cozy", trait: "caregiverNurturer" }
        ]
      },
      {
        id: 16,
        question: "What's something you wish we did more often?",
        options: [
          { id: 'a', text: "Laugh till we cry", trait: "romanticIdealist" },
          { id: 'b', text: "Cook together", trait: "caregiverNurturer" },
          { id: 'c', text: "Go tech-free for a while", trait: "practicalRealist" },
          { id: 'd', text: "Celebrate small wins", trait: "caregiverNurturer" }
        ]
      },
      {
        id: 17,
        question: "If our love story was a genre, what would it be?",
        options: [
          { id: 'a', text: "Romantic comedy", trait: "romanticIdealist" },
          { id: 'b', text: "Drama with a happy ending", trait: "romanticIdealist" },
          { id: 'c', text: "Adventure fantasy", trait: "romanticIdealist" },
          { id: 'd', text: "Mystery but make it romantic", trait: "romanticIdealist" }
        ]
      },
      {

      id: 18,
      question: "What drives your connection most?",
      options: [
    { id: 'a', text: "Shared life goals", trait: "practicalRealist" },
    { id: 'b', text: "Spontaneous joy and fun", trait: "romanticIdealist" },
    { id: 'c', text: "The ability to grow individually and together", trait: "fearfulAvoidant" },
    { id: 'd', text: "Unspoken understanding and care", trait: "caregiverNurturer" }
  ]
},

    {
      id: 19,
      question: "How do you feel about having couple goals on social media?",
      options: [
        { id: 'a', text: "Love sharing them", trait: "romanticIdealist" },
        { id: 'b', text: "Rather keep it private", trait: "fearfulAvoidant" },
        { id: 'c', text: "A little of both", trait: "practicalRealist" },
        { id: 'd', text: "Don’t care much either way", trait: "practicalRealist" }
      ]
    },
    {
      id: 20,
      question: "What's your idea of 'quality time'?",
      options: [
        { id: 'a', text: "Deep talks without distractions", trait: "caregiverNurturer" },
        { id: 'b', text: "Doing hobbies together", trait: "practicalRealist" },
        { id: 'c', text: "Watching shows side by side", trait: "caregiverNurturer" },
        { id: 'd', text: "Trying new things as a team", trait: "romanticIdealist" }
      ]
    },
    {
      id: 21,
      question: "How important are anniversaries to you?",
      options: [
        { id: 'a', text: "Very important", trait: "romanticIdealist" },
        { id: 'b', text: "Nice, but not everything", trait: "practicalRealist" },
        { id: 'c', text: "A reason to celebrate big", trait: "romanticIdealist" },
        { id: 'd', text: "Rather keep it simple", trait: "practicalRealist" }
      ]
    },
    {
      id: 22,
      question: "What do you think is our relationship's superpower?",
      options: [
        { id: 'a', text: "Communication", trait: "practicalRealist" },
        { id: 'b', text: "Humor", trait: "romanticIdealist" },
        { id: 'c', text: "Trust", trait: "caregiverNurturer" },
        { id: 'd', text: "Shared goals", trait: "practicalRealist" }
      ]
    },
    {
      id: 23,
      question: "Which of these is hardest for you to say?",
      options: [
        { id: 'a', text: "I need help.", trait: "fearfulAvoidant" },
        { id: 'b', text: "I’m sorry.", trait: "practicalRealist" },
        { id: 'c', text: "I’m scared.", trait: "fearfulAvoidant" },
        { id: 'd', text: "I love you.", trait: "fearfulAvoidant" }
      ]
    },
    {
      id: 24,
      question: "What’s the most underrated part of our relationship?",
      options: [
        { id: 'a', text: "The little daily routines", trait: "caregiverNurturer" },
        { id: 'b', text: "The way we cheer each other on", trait: "caregiverNurturer" },
        { id: 'c', text: "The quiet understanding", trait: "practicalRealist" },
        { id: 'd', text: "The silliness we share", trait: "romanticIdealist" }
      ]
    },
    {
      id: 25,
      question: "How do you feel about traveling together?",
      options: [
        { id: 'a', text: "Love it—best way to bond", trait: "romanticIdealist" },
        { id: 'b', text: "Enjoy it occasionally", trait: "practicalRealist" },
        { id: 'c', text: "Prefer solo trips sometimes", trait: "fearfulAvoidant" },
        { id: 'd', text: "Haven’t done it much yet", trait: "practicalRealist" }
      ]
    },
    {
      id: 26,
      question: "How do you feel about planning for the long term?",
      options: [
        { id: 'a', text: "Excited to build together", trait: "romanticIdealist" },
        { id: 'b', text: "Prefer to take it day by day", trait: "practicalRealist" },
        { id: 'c', text: "A mix of both", trait: "practicalRealist" },
        { id: 'd', text: "Still figuring it out", trait: "fearfulAvoidant" }
      ]
    },
    {
      id: 27,
      question: "When you’re feeling disconnected, what helps?",
      options: [
        { id: 'a', text: "Talking it out", trait: "practicalRealist" },
        { id: 'b', text: "Spending focused time together", trait: "caregiverNurturer" },
        { id: 'c', text: "Small gestures of love", trait: "caregiverNurturer" },
        { id: 'd', text: "Space to reflect", trait: "fearfulAvoidant" }
      ]
    },
    {
      id: 28,
      question: "How do you feel about expressing emotions?",
      options: [
        { id: 'a', text: "I’m an open book", trait: "romanticIdealist" },
        { id: 'b', text: "I share when I’m ready", trait: "caregiverNurturer" },
        { id: 'c', text: "I prefer actions over words", trait: "practicalRealist" },
        { id: 'd', text: "I find it challenging sometimes", trait: "fearfulAvoidant" }
      ]
    },
    {
      id: 29,
      question: "How do you feel about traditions and rituals?",
      options: [
        { id: 'a', text: "Love creating them", trait: "romanticIdealist" },
        { id: 'b', text: "Like some, but not too many", trait: "practicalRealist" },
        { id: 'c', text: "Prefer spontaneity", trait: "romanticIdealist" },
        { id: 'd', text: "Haven’t thought about it", trait: "practicalRealist" }
      ]
    },
    {
      id: 30,
      question: "What’s the sweetest thing I do without realizing?",
      options: [
        { id: 'a', text: "The way you look at me", trait: "romanticIdealist" },
        { id: 'b', text: "Your random acts of kindness", trait: "caregiverNurturer" },
        { id: 'c', text: "Your goofy side", trait: "romanticIdealist" },
        { id: 'd', text: "The way you believe in me", trait: "caregiverNurturer" }
      ]
    }
  ],
  
   mcq1: 
  [
    {
      id: 1,
      question: "When you imagine us many years from now, what do you hope we'll still be doing together?",
      options: [
        { id: 'a', text: "Laughing over inside jokes", trait: "romanticIdealist" },
        { id: 'b', text: "Cooking meals together", trait: "caregiverNurturer" },
        { id: 'c', text: "Traveling to new places", trait: "romanticIdealist" },
        { id: 'd', text: "Supporting each other’s dreams", trait: "caregiverNurturer" }
      ]
    },
    {
      id: 2,
      question: "What's one area where you'd like us to grow as a couple?",
      options: [
        { id: 'a', text: "Communication during conflict", trait: "practicalRealist" },
        { id: 'b', text: "Trying new things together", trait: "romanticIdealist" },
        { id: 'c', text: "Balancing independence and time together", trait: "fearfulAvoidant" },
        { id: 'd', text: "Understanding each other’s emotional needs", trait: "caregiverNurturer" }
      ]
    },
    {
      id: 3,
      question: "What do you think our biggest strengths are as a team?",
      options: [
        { id: 'a', text: "We lift each other up", trait: "caregiverNurturer" },
        { id: 'b', text: "We always have fun together", trait: "romanticIdealist" },
        { id: 'c', text: "We get through challenges", trait: "practicalRealist" },
        { id: 'd', text: "We’re open and honest", trait: "practicalRealist" }
      ]
    },
    {
      id: 4,
      question: "What's something you're still curious to learn about me?",
      options: [
        { id: 'a', text: "Your childhood stories", trait: "caregiverNurturer" },
        { id: 'b', text: "Your secret dreams", trait: "romanticIdealist" },
        { id: 'c', text: "What makes you feel most loved", trait: "caregiverNurturer" },
        { id: 'd', text: "Your deepest fears", trait: "fearfulAvoidant" }
      ]
    },
    {
      id: 5,
      question: "What's one little ritual or habit of ours that you hope never changes?",
      options: [
        { id: 'a', text: "Goodnight texts or kisses", trait: "caregiverNurturer" },
        { id: 'b', text: "Random check-in messages", trait: "caregiverNurturer" },
        { id: 'c', text: "Our silly jokes", trait: "romanticIdealist" },
        { id: 'd', text: "Morning routines together", trait: "practicalRealist" }
      ]
    },
    {
      id: 6,
      question: "How do you feel about our balance between routine and adventure?",
      options: [
        { id: 'a', text: "Love the stability", trait: "practicalRealist" },
        { id: 'b', text: "Wish for a little more excitement", trait: "romanticIdealist" },
        { id: 'c', text: "It’s just right", trait: "practicalRealist" },
        { id: 'd', text: "Let’s shake things up sometimes!", trait: "romanticIdealist" }
      ]
    },
    {
      id: 7,
      question: "What's one dream or goal you haven't shared with me yet?",
      options: [
        { id: 'a', text: "Starting something creative together", trait: "romanticIdealist" },
        { id: 'b', text: "A big move or travel adventure", trait: "romanticIdealist" },
        { id: 'c', text: "Building something long-term", trait: "practicalRealist" },
        { id: 'd', text: "A personal growth goal", trait: "fearfulAvoidant" }
      ]
    },
    {
      id: 8,
      question: "What's something you appreciate more about me now than you did early on?",
      options: [
        { id: 'a', text: "Your patience", trait: "caregiverNurturer" },
        { id: 'b', text: "Your sense of humor", trait: "romanticIdealist" },
        { id: 'c', text: "How deeply you care", trait: "caregiverNurturer" },
        { id: 'd', text: "Your ability to adapt", trait: "practicalRealist" }
      ]
    },
    {
      id: 9,
      question: "If we could design our ideal day together, what would it look like?",
      options: [
        { id: 'a', text: "Lazy morning, good food, and cuddles", trait: "caregiverNurturer" },
        { id: 'b', text: "Exploring a new place", trait: "romanticIdealist" },
        { id: 'c', text: "Laughing and playing games", trait: "romanticIdealist" },
        { id: 'd', text: "Meaningful conversations and sunset walks", trait: "romanticIdealist" }
      ]
    },
    {
      id: 10,
      question: "What do you think helps keep our connection strong over time?",
      options: [
        { id: 'a', text: "Staying honest", trait: "practicalRealist" },
        { id: 'b', text: "Making time for each other", trait: "caregiverNurturer" },
        { id: 'c', text: "Being silly and light", trait: "romanticIdealist" },
        { id: 'd', text: "Listening without judgment", trait: "caregiverNurturer" }
      ]
    },
      {
        id: 11,
        question: "What's something you'd love to try together that we haven't done yet?",
        options: [
          { id: 'a', text: "A cooking or art class", trait: "romanticIdealist" },
          { id: 'b', text: "A spontaneous road trip", trait: "romanticIdealist" },
          { id: 'c', text: "Volunteering for a cause", trait: "caregiverNurturer" },
          { id: 'd', text: "A wellness retreat", trait: "practicalRealist" }
        ]
      },
      {
        id: 12,
        question: "When you think about the tough times we've faced, what helped us get through them?",
        options: [
          { id: 'a', text: "Our honest conversations", trait: "practicalRealist" },
          { id: 'b', text: "Staying committed", trait: "caregiverNurturer" },
          { id: 'c', text: "Laughing when we could", trait: "romanticIdealist" },
          { id: 'd', text: "Giving each other space", trait: "fearfulAvoidant" }
        ]
      },
      {
        id: 13,
        question: "How do you feel about how we express affection lately?",
        options: [
          { id: 'a', text: "It feels just right", trait: "practicalRealist" },
          { id: 'b', text: "I’d love a little more physical closeness", trait: "caregiverNurturer" },
          { id: 'c', text: "I’d like more words of love", trait: "romanticIdealist" },
          { id: 'd', text: "I appreciate the small gestures most", trait: "practicalRealist" }
        ]
      },
      {
        id: 14,
        question: "What helps you feel most secure in our relationship?",
        options: [
          { id: 'a', text: "Consistency and trust", trait: "practicalRealist" },
          { id: 'b', text: "Affection and closeness", trait: "caregiverNurturer" },
          { id: 'c', text: "Knowing we share the same goals", trait: "practicalRealist" },
          { id: 'd', text: "Open communication", trait: "practicalRealist" }
        ]
      },
      {
        id: 15,
        question: "If we could learn a new skill or hobby as a couple, what would you pick?",
        options: [
          { id: 'a', text: "Dance lessons", trait: "romanticIdealist" },
          { id: 'b', text: "Gardening", trait: "caregiverNurturer" },
          { id: 'c', text: "Photography", trait: "romanticIdealist" },
          { id: 'd', text: "Cooking new cuisines", trait: "romanticIdealist" }
        ]
      },
      {
        id: 16,
        question: "What’s something small I do that always makes your day brighter?",
        options: [
          { id: 'a', text: "Your smile", trait: "romanticIdealist" },
          { id: 'b', text: "Your little notes or messages", trait: "caregiverNurturer" },
          { id: 'c', text: "Your random acts of kindness", trait: "caregiverNurturer" },
          { id: 'd', text: "Your silly humor", trait: "romanticIdealist" }
        ]
      },
      {
        id: 17,
        question: "When you imagine growing old with me, what do you see?",
        options: [
          { id: 'a', text: "Traveling in retirement", trait: "romanticIdealist" },
          { id: 'b', text: "Relaxing together at home", trait: "practicalRealist" },
          { id: 'c', text: "Hosting family gatherings", trait: "caregiverNurturer" },
          { id: 'd', text: "Learning and growing side by side", trait: "practicalRealist" }
        ]
      },
      {
        id: 18,
        question: "What’s a dream trip you’d love us to take together?",
        options: [
          { id: 'a', text: "Exploring Europe", trait: "romanticIdealist" },
          { id: 'b', text: "A tropical island getaway", trait: "romanticIdealist" },
          { id: 'c', text: "A road trip across the country", trait: "romanticIdealist" },
          { id: 'd', text: "A wilderness adventure", trait: "romanticIdealist" }
        ]
      },
      {
        id: 19,
        question: "What do you think makes our bond unique?",
        options: [
          { id: 'a', text: "Our shared humor", trait: "romanticIdealist" },
          { id: 'b', text: "How we support each other", trait: "caregiverNurturer" },
          { id: 'c', text: "The way we communicate", trait: "practicalRealist" },
          { id: 'd', text: "Our shared vision", trait: "practicalRealist" }
        ]
      },
      {
        id: 20,
        question: "What’s something you’d love us to learn together?",
        options: [
          { id: 'a', text: "A new language", trait: "romanticIdealist" },
          { id: 'b', text: "A sport or activity", trait: "romanticIdealist" },
          { id: 'c', text: "An instrument", trait: "romanticIdealist" },
          { id: 'd', text: "Mindfulness practices", trait: "practicalRealist" }
        ]
      },
      {
        id: 21,
        question: "What’s your favorite memory of us so far?",
        options: [
          { id: 'a', text: "Our first trip together", trait: "romanticIdealist" },
          { id: 'b', text: "A special celebration", trait: "romanticIdealist" },
          { id: 'c', text: "A quiet moment", trait: "caregiverNurturer" },
          { id: 'd', text: "Something unexpected we handled well", trait: "practicalRealist" }
        ]
      },
      {
        id: 22,
        question: "How do you feel most appreciated by me?",
        options: [
          { id: 'a', text: "Hearing words of affirmation", trait: "romanticIdealist" },
          { id: 'b', text: "Small gestures and surprises", trait: "caregiverNurturer" },
          { id: 'c', text: "Quality time together", trait: "caregiverNurturer" },
          { id: 'd', text: "Physical affection", trait: "caregiverNurturer" }
        ]
      },
      {
        id: 23,
        question: "What’s one thing we could do more often to stay connected?",
        options: [
          { id: 'a', text: "Date nights", trait: "romanticIdealist" },
          { id: 'b', text: "Deep conversations", trait: "caregiverNurturer" },
          { id: 'c', text: "Trying new activities", trait: "romanticIdealist" },
          { id: 'd', text: "Unplugged time", trait: "practicalRealist" }
        ]
      },
      {
        id: 24,
        question: "What are you most proud of about our relationship?",
        options: [
          { id: 'a', text: "How we’ve grown together", trait: "practicalRealist" },
          { id: 'b', text: "How we handle challenges", trait: "practicalRealist" },
          { id: 'c', text: "How much we laugh", trait: "romanticIdealist" },
          { id: 'd', text: "The trust we’ve built", trait: "caregiverNurturer" }
        ]
      },
      {
        id: 25,
        question: "What helps you feel most loved?",
        options: [
          { id: 'a', text: "Words of love", trait: "romanticIdealist" },
          { id: 'b', text: "Thoughtful actions", trait: "caregiverNurturer" },
          { id: 'c', text: "Time and attention", trait: "caregiverNurturer" },
          { id: 'd', text: "Physical closeness", trait: "caregiverNurturer" }
        ]
      },
      {
        id: 26,
        question: "What’s something you want us to build or create together?",
        options: [
          { id: 'a', text: "A cozy home", trait: "caregiverNurturer" },
          { id: 'b', text: "A shared project", trait: "romanticIdealist" },
          { id: 'c', text: "A family", trait: "caregiverNurturer" },
          { id: 'd', text: "A business or cause", trait: "practicalRealist" }
        ]
      },
      {
        id: 27,
        question: "When do you feel closest to me?",
        options: [
          { id: 'a', text: "During quiet moments", trait: "caregiverNurturer" },
          { id: 'b', text: "When we’re laughing", trait: "romanticIdealist" },
          { id: 'c', text: "When we face challenges together", trait: "practicalRealist" },
          { id: 'd', text: "When we’re affectionate", trait: "caregiverNurturer" }
        ]
      },
      {
        id: 28,
        question: "What’s something you’d love to hear me say more often?",
        options: [
          { id: 'a', text: "I appreciate you", trait: "caregiverNurturer" },
          { id: 'b', text: "I’m proud of you", trait: "caregiverNurturer" },
          { id: 'c', text: "I love you", trait: "romanticIdealist" },
          { id: 'd', text: "I’m here for you", trait: "caregiverNurturer" }
        ]
      },
      {
        id: 29,
        question: "What’s one thing you want us to promise each other?",
        options: [
          { id: 'a', text: "To always be honest", trait: "practicalRealist" },
          { id: 'b', text: "To never stop growing", trait: "practicalRealist" },
          { id: 'c', text: "To always have each other’s backs", trait: "caregiverNurturer" },
          { id: 'd', text: "To keep the fun alive", trait: "romanticIdealist" }
        ]
      },
      {
        id: 30,
        question: "What does home feel like to you with me?",
        options: [
          { id: 'a', text: "Safe and steady", trait: "practicalRealist" },
          { id: 'b', text: "Warm and loving", trait: "caregiverNurturer" },
          { id: 'c', text: "Playful and fun", trait: "romanticIdealist" },
          { id: 'd', text: "Full of possibility", trait: "romanticIdealist" }
        ]
      },
      {
        id: 31,
        question: "What’s something you hope never changes between us?",
        options: [
          { id: 'a', text: "Our trust", trait: "practicalRealist" },
          { id: 'b', text: "Our laughter", trait: "romanticIdealist" },
          { id: 'c', text: "Our closeness", trait: "caregiverNurturer" },
          { id: 'd', text: "Our curiosity about each other", trait: "romanticIdealist" }
        ]
      },
      {
        id: 32,
        question: "What’s one way we could be even better as a team?",
        options: [
          { id: 'a', text: "More open communication", trait: "practicalRealist" },
          { id: 'b', text: "More shared goals", trait: "practicalRealist" },
          { id: 'c', text: "More adventure together", trait: "romanticIdealist" },
          { id: 'd', text: "More quality time", trait: "caregiverNurturer" }
        ]
      },
    {
      id: 33,
      question: "Which date feels most like ‘us’?",
      options: [
        { id: 'a', text: "Picnic in the park under the stars", trait: "romanticIdealist" },
        { id: 'b', text: "Attending a personal growth workshop", trait: "practicalRealist" },
        { id: 'c', text: "Cooking together at home", trait: "caregiverNurturer" },
        { id: 'd', text: "Watching a movie in silence but feeling understood", trait: "fearfulAvoidant" }
      ]
    },
    {
      id: 34,
      question: "What emotional need do you crave most in a partner?",
      options: [
        { id: 'a', text: "Reassurance and presence", trait: "caregiverNurturer" },
        { id: 'b', text: "Freedom to be myself", trait: "fearfulAvoidant" },
        { id: 'c', text: "Support in achieving goals", trait: "practicalRealist" },
        { id: 'd', text: "Shared wonder and romance", trait: "romanticIdealist" }
      ]
    },
      {
        id: 35,
        question: "What’s something you’re excited for in our future?",
        options: [
          { id: 'a', text: "Traveling together", trait: "romanticIdealist" },
          { id: 'b', text: "Building our dreams", trait: "practicalRealist" },
          { id: 'c', text: "Growing old together", trait: "romanticIdealist" },
          { id: 'd', text: "Discovering new things about each other", trait: "romanticIdealist" }
        ]
      }
    ]  
  };

const compatibilityProfiles = {
  romanticIdealist: {
    name: "Romantic Idealist",
    emoji: "💖",
    color: "text-pink-400",
    description: "You dream of deep, soulful connections and grand love stories. You believe in magic, serendipity, and the power of emotion."
  },
  practicalRealist: {
    name: "Practical Realist",
    emoji: "🛠️",
    color: "text-amber-400",
    description: "You're grounded, thoughtful, and believe strong relationships are built on consistency, effort, and trust."
  },
  fearfulAvoidant: {
    name: "Fearful Avoidant",
    emoji: "😟",
    color: "text-blue-400",
    description: "You value connection but fear vulnerability. You seek love cautiously and need space and trust to open up."
  },
  caregiverNurturer: {
    name: "Caregiver / Nurturer",
    emoji: "🌿",
    color: "text-green-400",
    description: "You lead with empathy and kindness. You thrive in emotionally rich, supportive relationships where care flows both ways."
  }
};

export default function MatchQuiz() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // State management
  const [quizState, setQuizState] = useState({
    currentQuestion: 0,
    answers: {},
    isComplete: false,
    results: null,
    quizQuestions: [],
    hasPreviousResult: false,
    previousResult: null,
    showQuiz: false,
    loading: true,
    error: null,
    questionsReady: false // New state to track question readiness
  });

  // Generate quiz questions function
  const generateQuizQuestions = () => {
    try {
      const randomMCQs = [...questionPool.mcq]
        .sort(() => 0.5 - Math.random())
        .slice(0, 6);

      const randomMCQ1 = [...questionPool.mcq1]
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

      const allQuestions = [];
      let mcqIndex = 0;
      let mcq1Index = 0;

      for (let i = 0; i < 10; i++) {
        if ((i < 6 && Math.random() > 0.5) || mcq1Index >= 4) {
          if (mcqIndex < 6) {
            allQuestions.push({ ...randomMCQs[mcqIndex++], type: "mcq" });
          }
        } else {
          if (mcq1Index < 4) {
            allQuestions.push({ ...randomMCQ1[mcq1Index++], type: "mcq1" });
          }
        }
      }

      while (allQuestions.length < 10) {
        if (mcqIndex < 6) {
          allQuestions.push({ ...randomMCQs[mcqIndex++], type: "mcq" });
        } else if (mcq1Index < 4) {
          allQuestions.push({ ...randomMCQ1[mcq1Index++], type: "mcq1" });
        }
      }

      return allQuestions;
    } catch (error) {
      console.error("Error generating questions:", error);
      return []; // Return empty array if generation fails
    }
  };

  // Check for previous results on mount
  useEffect(() => {
    const checkPreviousResult = async () => {
      try {
        if (user?.uid) {
          const quizRef = doc(db, "users", user.uid, "compatibilityQuiz", "result");
          const docSnap = await getDoc(quizRef);
          
          setQuizState(prev => ({
            ...prev,
            hasPreviousResult: docSnap.exists(),
            previousResult: docSnap.exists() ? docSnap.data() : null,
            showQuiz: !docSnap.exists(),
            loading: false
          }));
        }
      } catch (err) {
        console.error("Error checking previous result:", err);
        setQuizState(prev => ({
          ...prev,
          error: "Couldn't load previous results. You can still take a new quiz.",
          showQuiz: true,
          loading: false
        }));
      }
    };

    checkPreviousResult();
  }, [user]);

  // Generate questions when needed
  useEffect(() => {
    if (quizState.showQuiz && quizState.quizQuestions.length === 0 && !quizState.questionsReady) {
      const newQuestions = generateQuizQuestions();
      setQuizState(prev => ({
        ...prev,
        quizQuestions: newQuestions,
        questionsReady: newQuestions.length > 0
      }));
    }
  }, [quizState.showQuiz, quizState.questionsReady]);

  // Start new quiz function
  const startNewQuiz = () => {
    const newQuestions = generateQuizQuestions();
    setQuizState({
      currentQuestion: 0,
      answers: {},
      isComplete: false,
      results: null,
      quizQuestions: newQuestions,
      hasPreviousResult: false,
      previousResult: null,
      showQuiz: true,
      loading: false,
      error: null,
      questionsReady: newQuestions.length > 0
    });
  };

  // Handle answer selection
  const handleAnswer = (questionId, answer) => {
    setQuizState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answer
      }
    }));
    
    setTimeout(() => {
      if (quizState.currentQuestion < quizState.quizQuestions.length - 1) {
        setQuizState(prev => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1
        }));
      } else {
        calculateResults();
      }
    }, 300);
  };

  // Calculate and save results
  const calculateResults = async () => {
    try {
      const traitCounts = {};
      Object.values(quizState.answers).forEach((answer) => {
        traitCounts[answer.trait] = (traitCounts[answer.trait] || 0) + 1;
      });

      const dominantTrait = Object.keys(traitCounts).reduce((a, b) =>
        traitCounts[a] > traitCounts[b] ? a : b
      );

      const profile = compatibilityProfiles[dominantTrait];
      const compatibleTraits = getCompatibleTraits(dominantTrait);

      const resultData = {
        timestamp: new Date(),
        answers: quizState.answers,
        primaryTrait: dominantTrait,
        result: profile.name
      };

      try {
        const { uid } = user;
        const quizRef = doc(db, "users", uid, "compatibilityQuiz", "result");
        await setDoc(quizRef, resultData);
      } catch (err) {
        console.error("❌ Error saving quiz result:", err);
        throw err;
      }

      setQuizState(prev => ({
        ...prev,
        isComplete: true,
        results: {
          primaryProfile: { ...profile, trait: dominantTrait },
          compatibleProfiles: compatibleTraits.map((trait) => ({
            ...compatibilityProfiles[trait],
            trait,
            compatibility: Math.floor(Math.random() * 20) + 80
          }))
        }
      }));
    } catch (error) {
      console.error("Error calculating results:", error);
      setQuizState(prev => ({
        ...prev,
        error: "Couldn't calculate results. Please try again."
      }));
    }
  };

  // Get compatible traits
  const getCompatibleTraits = (trait) => {
    const compatibilityMap = {
      romanticIdealist: ["caregiverNurturer"],
      practicalRealist: ["practicalRealist"],
      fearfulAvoidant: ["caregiverNurturer"],
      caregiverNurturer: ["romanticIdealist"]
    };
    return compatibilityMap[trait] || [];
  };

  // Loading state
  if (quizState.loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-pink-500">
        Loading...
      </div>
    );
  }

  // Error state
  if (quizState.error) {
    return (
      <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
        <div className="max-w-md text-center">
          <p className="text-red-400 mb-4">{quizState.error}</p>
          <button
            onClick={() => setQuizState(prev => ({ ...prev, error: null }))}
            className="px-6 py-3 bg-pink-500 rounded-full"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // Show previous results if they exist
  if (quizState.hasPreviousResult && !quizState.showQuiz && !quizState.isComplete) {
    const profile = compatibilityProfiles[quizState.previousResult.primaryTrait];
    const compatibleTraits = getCompatibleTraits(quizState.previousResult.primaryTrait);
    
    return (
//<div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-4 py-12">
<div className="min-h-screen bg-black text-white px-4 py-12">
<div className="bg-black border-b border-pink-500/20">
<div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-colors"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-5 h-5" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
              <span>Back</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-4 h-4 text-white" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10 2a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V6H8a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1H8a1 1 0 010-2h1v-1a1 1 0 011-1zM5 9a1 1 0 011-1h1a1 1 0 110 2H6a1 1 0 01-1-1zm0 5a1 1 0 011-1h1a1 1 0 110 2H6a1 1 0 01-1-1z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br></br> <br></br> <br></br>
<Helmet>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

  <div className="p-6 max-w-2xl mx-auto text-center border border-pink-700/50 rounded-2xl bg-black/40 backdrop-blur-sm shadow-xl">
    <h1 className="text-4xl font-extrabold mb-6 text-pink-400">Your Connection Profile ✨</h1>

    <h3 className="mt-6 text-xl font-semibold text-pink-300">
      You resonate most with
    </h3>

    <div className="flex justify-center mt-6">
      {compatibleTraits.slice(0, 1).map((trait) => {
        const compatibleProfile = compatibilityProfiles[trait];
        return (
          <div
            key={trait}
            className="bg-pink-900/20 p-6 rounded-xl border border-pink-500 w-80 text-center shadow-lg"
          >
            <div className="text-4xl mb-2">{compatibleProfile.emoji}</div>
            <div className="text-xl font-bold">{compatibleProfile.name}</div>
            <div className="text-pink-400 text-sm mt-1">
              {Math.floor(Math.random() * 20) + 80}% compatibility
            </div>
            <p className="text-sm text-gray-300 mt-4 italic">
              {compatibleProfile.description}
            </p>
          </div>
        );
      })}
    </div>
  
          
          <div className="mt-8 flex flex-col space-y-4">
            <button
              onClick={startNewQuiz}
              className="px-6 py-3 bg-pink-500 rounded-full"
            >
              Retake Quiz
            </button>
           
          </div>
        </div>
      </div>
    );
  }

  // Show quiz results if complete
if (quizState.isComplete && quizState.results) {
  const bestMatch = quizState.results.compatibleProfiles[0];

  return (
    //<div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-4 py-10">
    <div className="min-h-screen bg-black text-white px-4 py-10">
      {quizState.error && (
        <div className="bg-red-900/50 p-4 text-center rounded-md mb-4 border border-red-700 max-w-xl mx-auto">
          {quizState.error}
        </div>
      )}

<div className="bg-black border-b border-pink-500/20">
<div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-colors"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-5 h-5" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
              <span>Back</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-4 h-4 text-white" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10 2a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V6H8a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1H8a1 1 0 010-2h1v-1a1 1 0 011-1zM5 9a1 1 0 011-1h1a1 1 0 110 2H6a1 1 0 01-1-1zm0 5a1 1 0 011-1h1a1 1 0 110 2H6a1 1 0 01-1-1z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br></br> <br></br> <br></br>

      <div className="p-6 max-w-2xl mx-auto text-center border border-pink-700/50 rounded-2xl bg-black/40 backdrop-blur-sm shadow-xl">
        <h1 className="text-4xl font-extrabold mb-6 text-pink-400">Your Result ✨</h1>

        <h3 className="mt-6 text-xl font-semibold text-pink-300">
          You resonate most with
        </h3>

        <div className="flex justify-center mt-6">
          <div
            className="bg-pink-900/20 p-6 rounded-xl border border-pink-500 w-80 text-center shadow-lg"
          >
            <div className="text-4xl mb-2">{bestMatch.emoji}</div>
            <div className="text-xl font-bold">{bestMatch.name}</div>
            <div className="text-pink-400 text-sm mt-1">
              {bestMatch.compatibility}% compatibility
            </div>
            <p className="text-sm text-gray-300 mt-4 italic">
              {bestMatch.description}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col space-y-4">
          
          <button
            onClick={startNewQuiz}
            className="px-6 py-3 bg-pink-500 hover:bg-pink-500 rounded-full font-medium transition duration-200"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
}


  // Show loading if questions aren't ready
  if (!quizState.showQuiz || !quizState.questionsReady || quizState.quizQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-pink-500">
        Loading questions...
      </div>
    );
  }

  // Safely get current question
  const currentQ = quizState.quizQuestions[quizState.currentQuestion];
  if (!currentQ) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-pink-500">
        Error loading question. Please try again.
      </div>
    );
  }

  // Show current question
  return (
  
    <div className="min-h-screen bg-black text-white p-12 max-w-3xl mx-auto">

<div className="bg-black border-b border-pink-500/20">
<div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-colors"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-5 h-5" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
              <span>Back</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-4 h-4 text-white" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10 2a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V6H8a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1H8a1 1 0 010-2h1v-1a1 1 0 011-1zM5 9a1 1 0 011-1h1a1 1 0 110 2H6a1 1 0 01-1-1zm0 5a1 1 0 011-1h1a1 1 0 110 2H6a1 1 0 01-1-1z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>


      <br></br> <br></br> <br></br> 




      <h1 className="text-3xl text-center mb-12">
        Soul Connection Quiz 🦋
      </h1>
      <p className="mb-8">
        Question {quizState.currentQuestion + 1} of {quizState.quizQuestions.length}
      </p>
<h2 className="text-2xl font-semibold mb-6 border-l-4 border-pink-500 pl-4">
  {currentQ.question}
</h2>
<div className="space-y-4">
  {currentQ.options.map((option) => (
    <button
      key={option.id}
      onClick={() => handleAnswer(currentQ.id, option)}
      className="block w-full text-left p-4 bg-gradient-to-r from-pink-700 to-pink-500 hover:brightness-110 rounded-xl border border-pink-300 transition-all duration-200 shadow-md hover:scale-[1.02]"
    >
      {option.text}
    </button>
  ))}
</div>

    </div>
  );
}