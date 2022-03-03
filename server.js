const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3001);
app.locals.title = 'Roller Derby Rules';
app.locals.whistles = [
  {id: 'w1', name: 'one short blast', use: 'start a jam', blower: 'jam timer'},
  {id: 'w2', name: 'two rapid, short blasts', use: 'indicate lead jammer', blower: 'jammer referee'},
  {id: 'w3', name: 'four rapid, short blasts', use: 'stop time/end the jam', blower: 'lead jammer referee, then all other referees'},
  { id: 'w4', name: 'one long blast', use: 'indication of penalty assessment', blower: 'referee assigning penalty'},
  { id: 'w5', name: 'rolling whistle', use: 'indicate end of timeout/ end of period', blower: 'head referee' }
]
app.locals.handSignals = [
  {
    id: 'hs1', name: 'back block', use: 'penalty assessment', signal: 'referee holds two hands in front of body and then extends arms', image: 'https://i.postimg.cc/PrVjzcgm/Back-Block.png'},
  { id: 'hs2', name: 'high block', use: 'penalty assessment', signal: 'referee makes a fist in front of chin, then pulls down three inches', image:'https://i.postimg.cc/Vv73grVY/High-Block.png'},
  { id: 'hs3', name: 'low block', use: 'penalty assessment', signal: 'referee holds right arm across body with a knife hand in front of left shoulder', image: 'https://i.postimg.cc/7ZJp1LMk/Low-Block.png'},
  { id: 'hs4', name: 'head block', use: 'penalty assessment', signal: 'referee holds right hand flat touching back of helmet', image: 'https://i.postimg.cc/HxmDkCMC/Head-Block.png' },
  { id: 'hs5', name: 'forearm', use: 'penalty assessment', signal: 'referee grabs right forearm with left hand', image: 'https://i.postimg.cc/wvkKtb5R/Forearm.png' },
  { id: 'hs6', name: 'leg block', use: 'penalty assessment', signal: 'referee holds both hands parallel to each other over right shoulder, then moves hands diagonally to left hip', image: 'https://i.postimg.cc/SQZ5w9g4/Leg-Block.png' },
  { id: 'hs7', name: 'illegal contact', use: 'penalty assessment', signal: 'referee holds left arm perpendicular to front of body with palm up, right hand makes one chopping motion from right should to left palm', image: 'https://i.postimg.cc/3JNMR1kW/Illegal-Contact.png' },
  { id: 'hs8', name: 'direction', use: 'penalty assessment', signal: 'referee holds right arm out to side with palm up, then flips arm in front of body to have palm facing down', image: 'https://i.postimg.cc/gcNFmQkf/Direction.png' },
  { id: 'hs9', name: ' multiplayer block', use: 'penalty assessment', signal: 'referee holds both hands in front of chin with fingers curled together', image: 'https://i.postimg.cc/jCYtPJwL/Multiplayer.png' },
  { id: 'hs10', name: 'illegal position', use: 'penalty assessment', signal: 'referee holds left arm, with elbow bent 90 degrees, with hand pointed to the sky, then extend the arm forward', image: 'https://i.postimg.cc/fTrG0ddC/Illegal-Position.png' },
  { id: 'hs11', name: 'cut', use: 'penalty assessment', signal: 'referee holds forearms crossed in front of chest, hands facing outwards', image: 'https://i.postimg.cc/vZ1dPhyC/Cut.png' },
  { id: 'hs12', name: 'interference', use: 'penalty assessment', signal: 'referee sweeps right hand down left arm once', image: 'https://i.postimg.cc/mkrnPZ2K/Interference.png' },
  { id: 'hs13', name: 'illegal procedure', use: 'penalty assessment', signal: 'referee holds forearms stacked in front of chest, then switches arm positions', image: 'https://i.postimg.cc/gJs5cLdv/Illegal-Procedure.png' },
  { id: 'hs14', name: 'Misconduct', use: 'penalty assessment', signal: 'referee movies right hand across chest from left to right shoulder', image: 'https://i.postimg.cc/WzfHgRdz/Misconduct.png' },
  { id: 'hs15', name: 'five seconds', use: 'notify five seconds before jam start', signal: 'official holds arm straight up in the air with five fingers splayed', image: 'https://i.postimg.cc/XJXjbW67/Five-Seconds.png' },
  { id: 'hs16', name: 'jam start', use: 'to start the jam in conjunction with jam starting whistle', signal: 'official brings arm down from five seconds to point at the area in front of the foremost blocker, done with jam starting whistle', image: 'https://i.postimg.cc/g0vQ5BTt/Jam-Start.png' },
  { id: 'hs17', name: 'jam end', use: 'notify that the jam is ending', signal: 'official/referee holds hands on hips with elbows pointed out, lift hands from hips and return them to hips as ending whistle blows', image: 'https://i.postimg.cc/KjMm15Y6/Jam-Ending.png' },
  { id: 'hs18', name: 'team timeout', use: 'indicate a team timeout is requested/occuring', signal: 'official makes a \'T\' in front chest with their hands, team captains may also use this to request a timeout', image: 'https://i.postimg.cc/59k7PVtN/Team-Timeout.png' },
  { id: 'hs19', name: 'official timeout', use: 'indicate an official timeout is occuring', signal: 'official holds arms up parallel to ground with hands alternating taping shoulders and being straight out', image: 'https://i.postimg.cc/C5dvFvcg/Official-Timeout.png' },
  { id: 'hs20', name: 'official review', use: 'request an official review', signal: 'captains and designated alternates make an \'O\' with their hands above their helmet', image: 'https://i.postimg.cc/Jnr6F7Jt/Official-Review.png' },
  { id: 'hs21', name: 'star pass complete', use: 'indicate a star pass has been legally completed', signal: 'referee touches head with palm of a knife hand, moves hand away from head', image: 'https://i.postimg.cc/qM2CYsGD/Star-Pass-Complete.png' },
  { id: 'hs22', name: 'no earned pass', use: 'indicate that a jammer has not legally passed a number of skaters', signal: 'referee makes both hands into fists with index fingers extended, start with forearms crossed, move arm closest to chest around other hand until arms are once again crossed in front of chest', image: 'https://i.postimg.cc/s2R0p4gY/No-Earned-Pass.png' },
  { id: 'hs23', name: 'not lead jammer', use: 'indicate a jammer is not lead jammer', signal: 'jammer referee swings arms out and across body, palms facing down until skater enters the engagement zone', image: 'https://i.postimg.cc/Y9dnBcfR/Not-Lead-Jammer.png' },
  { id: 'hs24', name: 'lead jammer', use: 'indicate jammer is lead jammer', signal: 'jammer referee use right arm and index finger to point at jammer, while left arm is held in the air making an \'L\' shape, drop left arm when jammer reaches the engagement zone, continue pointing with right arm until jam ends or lead jammer status is lost', image: 'https://i.postimg.cc/ydstzyq1/Lead-Jammer.png' },
  { id: 'hs25', name: 'directing skater to remain', use: 'direct skaters to remain on the track', signal: 'hold arm slightly in front of body, palm facing you. Pull arm towards your body by bending the elbow', image: 'https://i.postimg.cc/QtPXNzjg/Directing-Skaters.png' },
  { id: 'hs26', name: 'directing skater to leave', use: 'direct skaters to leave the track', signal: 'hold arm in front of chest, palm facing out. Push arm away your body by bending the elbow', image: 'https://i.postimg.cc/QtPXNzjg/Directing-Skaters.png' },
  { id: 'hs27', name: 'out of play', use: 'warn skaters that they are out of play', signal: 'hold arm bent 90 degrees, fingers pointing up, to the side of the body. Continue holding until penalty is issued or all skaters return to play', image: 'https://i.postimg.cc/NG9X8q2c/Out-of-Play.png' },
  { id: 'hs28', name: 'no pack', use: 'notify that a no pack condition exists', signal: 'hold arms out to the side of the body, elbows bent at 90 degrees, fingers pointed up. Hold this position until a pack is reestablished', image: 'https://i.postimg.cc/FHSBdBNF/No-Pack.png' },
  { id: 'hs29', name: 'pack is here', use: 'define where the pack is', signal: 'hold straightened arms out left hand pointing at the front-most pack skater, right hand pointing at the rear-most pack skater', image: 'https://i.postimg.cc/tRKx2SFV/Pack-is-here.png' },
  { id: 'hs30', name: 'explusion', use: 'expell an individual from the game', signal: 'right hand makes a thumbs up sign, then move your fist over your right shoulder', image: 'https://i.postimg.cc/mkZv7NVX/Expulsion.png' },
]
app.get('/', (request, response) => {
  response.send('Welcome to Roller Derby API');
});

app.get('/api/v1/handSignals', (request, response) => {
  const handSignals = app.locals.handSignals;
  response.json({handSignals});
})

app.get('/api/v1/handSignals/:id', (request, response) => {
  const handSignals = app.locals.handSignals.find((handSignal) => handSignal.id === request.params.id) 
  response.json({ handSignals });
})

app.get('/api/v1/whistles', (request, response) => {
  const whistle = app.locals.whistles;
  response.json({ whistle });
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}`);
});