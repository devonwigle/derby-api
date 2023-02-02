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
    id: 'hs1', name: 'Back Block', use: 'penalty assessment', motion: 'referee holds two hands in front of body and then extends arms', rule: '4.1.1', image: 'https://i.postimg.cc/PrVjzcgm/Back-Block.png'},
  { id: 'hs2', name: 'High Block', use: 'penalty assessment', motion: 'referee makes a fist in front of chin, then pulls down three inches', rule: '4.1.1', image:'https://i.postimg.cc/Vv73grVY/High-Block.png'},
  { id: 'hs3', name: 'Low Block', use: 'penalty assessment', motion: 'referee holds right arm across body with a knife hand in front of left shoulder', rule: '4.1.1', image: 'https://i.postimg.cc/7ZJp1LMk/Low-Block.png'},
  { id: 'hs4', name: 'Head Block', use: 'penalty assessment', motion: 'referee holds right hand flat touching back of helmet', rule: '4.1.2', image: 'https://i.postimg.cc/HxmDkCMC/Head-Block.png' },
  { id: 'hs5', name: 'Forearm', use: 'penalty assessment', motion: 'referee grabs right forearm with left hand', rule: '4.1.2', image: 'https://i.postimg.cc/wvkKtb5R/Forearm.png' },
  { id: 'hs6', name: 'Leg Block', use: 'penalty assessment', motion: 'referee holds both hands parallel to each other over right shoulder, then moves hands diagonally to left hip', rule: '4.1.2', image: 'https://i.postimg.cc/SQZ5w9g4/Leg-Block.png' },
  { id: 'hs7', name: 'Illegal Contact', use: 'penalty assessment', motion: 'referee holds left arm perpendicular to front of body with palm up, right hand makes one chopping motion from right should to left palm', rule: '4.1.3', image: 'https://i.postimg.cc/3JNMR1kW/Illegal-Contact.png' },
  { id: 'hs8', name: 'Direction', use: 'penalty assessment', motion: 'referee holds right arm out to side with palm up, then flips arm in front of body to have palm facing down', rule: '4.1.3', image: 'https://i.postimg.cc/gcNFmQkf/Direction.png' },
  { id: 'hs9', name: ' Multiplayer Block', use: 'penalty assessment', motion: 'referee holds both hands in front of chin with fingers curled together', rule: '4.1.4', image: 'https://i.postimg.cc/jCYtPJwL/Multiplayer.png' },
  { id: 'hs10', name: 'Illegal Position', use: 'penalty assessment', motion: 'referee holds left arm, with elbow bent 90 degrees, with hand pointed to the sky, then extend the arm forward', rule: '4.2.1', image: 'https://i.postimg.cc/fTrG0ddC/Illegal-Position.png' },
  { id: 'hs11', name: 'Cut', use: 'penalty assessment', motion: 'referee holds forearms crossed in front of chest, hands facing outwards', rule: '4.2.2', image: 'https://i.postimg.cc/vZ1dPhyC/Cut.png' },
  { id: 'hs12', name: 'Interference', use: 'penalty assessment', motion: 'referee sweeps right hand down left arm once', rule: '4.2.3', image: 'https://i.postimg.cc/mkrnPZ2K/Interference.png' },
  { id: 'hs13', name: 'Illegal Procedure', use: 'penalty assessment', motion: 'referee holds forearms stacked in front of chest, then switches arm positions', rule: '4.2.4', image: 'https://i.postimg.cc/gJs5cLdv/Illegal-Procedure.png' },
  { id: 'hs14', name: 'Misconduct', use: 'penalty assessment', motion: 'referee movies right hand across chest from left to right shoulder', rule: '4.3', image: 'https://i.postimg.cc/WzfHgRdz/Misconduct.png' },
  { id: 'hs15', name: 'Five Seconds', use: 'notify five seconds before jam start', motion: 'official holds arm straight up in the air with five fingers splayed', rule: '5.2', image: 'https://i.postimg.cc/XJXjbW67/Five-Seconds.png' },
  { id: 'hs16', name: 'Jam Start', use: 'to start the jam in conjunction with jam starting whistle', motion: 'official brings arm down from five seconds to point at the area in front of the foremost blocker, done with jam starting whistle', rule: '1.1', image: 'https://i.postimg.cc/g0vQ5BTt/Jam-Start.png' },
  { id: 'hs17', name: 'Jam End', use: 'notify that the jam is ending', motion: 'official/referee holds hands on hips with elbows pointed out, lift hands from hips and return them to hips as ending whistle blows', rule: '1.1', image: 'https://i.postimg.cc/KjMm15Y6/Jam-Ending.png' },
  { id: 'hs18', name: 'Team Timeout', use: 'indicate a team timeout is requested/occuring', motion: 'official makes a \'T\' in front chest with their hands, team captains may also use this to request a timeout', rule: '1.3.1', image: 'https://i.postimg.cc/59k7PVtN/Team-Timeout.png' },
  { id: 'hs19', name: 'Official Timeout', use: 'indicate an official timeout is occuring', motion: 'official holds arms up parallel to ground with hands alternating taping shoulders and being straight out', rule: '1.3.3', image: 'https://i.postimg.cc/C5dvFvcg/Official-Timeout.png' },
  { id: 'hs20', name: 'Official Review', use: 'request an official review', motion: 'captains and designated alternates make an \'O\' with their hands above their helmet', rule: '1.3.2', image: 'https://i.postimg.cc/Jnr6F7Jt/Official-Review.png' },
  { id: 'hs21', name: 'Star Pass Complete', use: 'indicate a star pass has been legally completed', motion: 'referee touches head with palm of a knife hand, moves hand away from head', rule: '2.2.4', image: 'https://i.postimg.cc/qM2CYsGD/Star-Pass-Complete.png' },
  { id: 'hs22', name: 'No Earned Pass', use: 'indicate that a jammer has not legally passed a number of skaters', motion: 'referee makes both hands into fists with index fingers extended, start with forearms crossed, move arm closest to chest around other hand until arms are once again crossed in front of chest', rule: '2.2.4', image: 'https://i.postimg.cc/s2R0p4gY/No-Earned-Pass.png' },
  { id: 'hs23', name: 'Not Lead Jammer', use: 'indicate a jammer is not lead jammer', motion: 'jammer referee swings arms out and across body, palms facing down until skater enters the engagement zone', rule: '2.2.2', image: 'https://i.postimg.cc/Y9dnBcfR/Not-Lead-Jammer.png' },
  { id: 'hs24', name: 'Lead Jammer', use: 'indicate jammer is lead jammer', motion: 'jammer referee use right arm and index finger to point at jammer, while left arm is held in the air making an \'L\' shape, drop left arm when jammer reaches the engagement zone, continue pointing with right arm until jam ends or lead jammer status is lost', rule: '2.2.2', image: 'https://i.postimg.cc/ydstzyq1/Lead-Jammer.png' },
  { id: 'hs25', name: 'Directing Skater to Remain', use: 'direct skaters to remain on the track', motion: 'hold arm slightly in front of body, palm facing you. Pull arm towards your body by bending the elbow', rule: '5.2', image: 'https://i.postimg.cc/QtPXNzjg/Directing-Skaters.png' },
  { id: 'hs26', name: 'Directing Skater to Leave', use: 'direct skaters to leave the track', motion: 'hold arm in front of chest, palm facing out. Push arm away your body by bending the elbow', rule: '5.2', image: 'https://i.postimg.cc/QtPXNzjg/Directing-Skaters.png' },
  { id: 'hs27', name: 'Out of Play', use: 'warn skaters that they are out of play', motion: 'hold arm bent 90 degrees, fingers pointing up, to the side of the body. Continue holding until penalty is issued or all skaters return to play', rule: '2.3', image: 'https://i.postimg.cc/NG9X8q2c/Out-of-Play.png' },
  { id: 'hs28', name: 'No Pack', use: 'notify that a no pack condition exists', motion: 'hold arms out to the side of the body, elbows bent at 90 degrees, fingers pointed up. Hold this position until a pack is reestablished', rule: '2.3', image: 'https://i.postimg.cc/FHSBdBNF/No-Pack.png' },
  { id: 'hs29', name: 'Pack is Here', use: 'define where the pack is', motion: 'hold straightened arms out left hand pointing at the front-most pack skater, right hand pointing at the rear-most pack skater', rule: '2.3', image: 'https://i.postimg.cc/tRKx2SFV/Pack-is-here.png' },
  { id: 'hs30', name: 'Explusion', use: 'expell an individual from the game', motion: 'right hand makes a thumbs up sign, then move your fist over your right shoulder', rule: '4.3', image: 'https://i.postimg.cc/mkZv7NVX/Expulsion.png' },
]
app.get('/api', (request, response) => {
  response.send('Welcome to Roller Derby API');
});

app.get('/api/v1/handSignals', (request, response) => {
  const handSignals = app.locals.handSignals;
  response.json(handSignals);
})

app.get('/api/v1/handSignals/:id', (request, response) => {
  const handSignals = app.locals.handSignals.find((handSignal) => handSignal.id === request.params.id) 
  response.json(handSignals);
})

app.get('/api/v1/whistles', (request, response) => {
  const whistle = app.locals.whistles;
  response.json(whistle);
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}`);
});