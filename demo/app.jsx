void function() { 'use strict';

var CULTURE_SHIPS = [
  {id: 1, name: "5*Gelish-Oplule"}
, {id: 2, name: "7*Uagren"}
, {id: 3, name: "8*Churkun"}
, {id: 4, name: "8401.00 Partial Photic Boundary"}
, {id: 5, name: "A Fine Disregard for Awkward Facts"}
, {id: 6, name: "A Momentary Lapse Of Sanity"}
, {id: 7, name: "A Series Of Unlikely Explanations"}
, {id: 8, name: "A Ship With A View"}
, {id: 9, name: "Abalule-Sheliz"}
, {id: 10, name: "Ablation"}
, {id: 11, name: "Absolutely No You-Know-What"}
, {id: 12, name: "Abundance Of Onslaught"}
, {id: 13, name: "Advanced Case Of Chronic Patheticism"}
, {id: 14, name: "All The Same, I Saw It First"}
, {id: 15, name: "All Through With This Niceness And Negotiation Stuff"}
, {id: 16, name: "Another Fine Product From The Nonsense Factory"}
, {id: 17, name: "Anticipation Of A New Lover's Arrival, The"}
, {id: 18, name: "Anything Legal Considered"}
, {id: 19, name: "Appeal To Reason"}
, {id: 20, name: "Arbitrary"}
, {id: 21, name: "Armchair Traveller"}
, {id: 22, name: "Arrested Development"}
, {id: 23, name: "Attitude Adjuster"}
, {id: 24, name: "Awkward Customer"}
, {id: 25, name: "Bad for Business"}
, {id: 26, name: "Beats Working"}
, {id: 27, name: "Big Sexy Beast"}
, {id: 28, name: "Bodhisattva, OAQS"}
, {id: 29, name: "Boo!"}
, {id: 30, name: "Bora Horza Gobuchul"}
, {id: 31, name: "Break Even"}
, {id: 32, name: "But Who's Counting?"}
, {id: 33, name: "Caconym"}
, {id: 34, name: "Cantankerous"}
, {id: 35, name: "Cargo Cult"}
, {id: 36, name: "Charitable View"}
, {id: 37, name: "Charming But Irrational"}
, {id: 38, name: "Clear Air Turbulence"}
, {id: 39, name: "Congenital Optimist"}
, {id: 40, name: "Contents May Differ"}
, {id: 41, name: "Conventional Wisdom"}
, {id: 42, name: "Credibility Problem"}
, {id: 43, name: "Death and Gravity"}
, {id: 44, name: "Demented But Determined"}
, {id: 45, name: "Determinist"}
, {id: 46, name: "Different Tan"}
, {id: 47, name: "Displacement Activity"}
, {id: 48, name: "Don't Try This At Home"}
, {id: 49, name: "Dramatic Exit, Or, Thank you And Goodnight"}
, {id: 50, name: "Eight Rounds Rapid"}
, {id: 51, name: "Empiricist"}
, {id: 52, name: "Eschatologist"}
, {id: 53, name: "Ethics Gradient"}
, {id: 54, name: "Exaltation-Parsimony III"}
, {id: 55, name: "Excuses And Accusations"}
, {id: 56, name: "Experiencing A Significant Gravitas Shortfall"}
, {id: 57, name: "Falling Outside The Normal Moral Constraints"}
, {id: 58, name: "Fasilyce, Upon Waking"}
, {id: 59, name: "Fate Amenable To Change"}
, {id: 60, name: "Fine Till You Came Along"}
, {id: 61, name: "Flexible Demeanour"}
, {id: 62, name: "Fractious Person"}
, {id: 63, name: "Frank Exchange Of Views"}
, {id: 64, name: "Frightspear"}
, {id: 65, name: "Fulanya-Guang"}
, {id: 66, name: "Full Refund (formerly MBU 604)"}
, {id: 67, name: "Funny, It Worked Last Time..."}
, {id: 68, name: "Furious Purpose"}
, {id: 69, name: "Gellemtyan-Asool-Anafawaya"}
, {id: 70, name: "Germane Riposte"}
, {id: 71, name: "God Told Me To Do It"}
, {id: 72, name: "Gravitas Free Zone"}
, {id: 73, name: "Gravitas, What Gravitas?"}
, {id: 74, name: "Gravitas... Gravitas... No, Don't Help Me, I'll Get It In A Moment..."}
, {id: 75, name: "Grey Area (aka Meatfucker)"}
, {id: 76, name: "Gunboat Diplomat"}
, {id: 77, name: "Halation Effect"}
, {id: 78, name: "Hand Me The Gun And Ask Me Again"}
, {id: 79, name: "Happy Idiot Talk"}
, {id: 80, name: "Headcrash"}
, {id: 81, name: "Heavy Messing"}
, {id: 82, name: "Helpless In The Face Of Your Beauty"}
, {id: 83, name: "Hence the Fortress"}
, {id: 84, name: "Heresiarch"}
, {id: 85, name: "Hidden Income"}
, {id: 86, name: "Highpoint"}
, {id: 87, name: "Honest Mistake"}
, {id: 88, name: "Hundredth Idiot, The"}
, {id: 89, name: "Hylozoist"}
, {id: 90, name: "I Blame My Mother"}
, {id: 91, name: "I Blame The Parents"}
, {id: 92, name: "I Blame Your Mother"}
, {id: 93, name: "I Said, I've Got A Big Stick"}
, {id: 94, name: "I Thought He Was With You"}
, {id: 95, name: "In One Ear"}
, {id: 96, name: "Inappropriate Response"}
, {id: 97, name: "Injury Time"}
, {id: 98, name: "Inspiral, Coalescence, Ringdown"}
, {id: 99, name: "Invincible"}
, {id: 100, name: "Irregular Apocalypse"}
, {id: 101, name: "It'll Be Over By Christmas"}
, {id: 102, name: "It's Character Forming"}
, {id: 103, name: "It's My Party And I'll Sing If I Want To"}
, {id: 104, name: "Jaundiced Outlook"}
, {id: 105, name: "Just Another Victim Of The Ambient Morality"}
, {id: 106, name: "Just Passing Through"}
, {id: 107, name: "Just Read The Instructions"}
, {id: 108, name: "Just Testing"}
, {id: 109, name: "Just the Washing Instruction Chip in Life's Rich Tapestry"}
, {id: 110, name: "Kakistocrat"}
, {id: 111, name: "Killing Time"}
, {id: 112, name: "Kiss My Ass"}
, {id: 113, name: "Kiss the Blade"}
, {id: 114, name: "Kiss This Then"}
, {id: 115, name: "Lacking That Small Match Temperament"}
, {id: 116, name: "Lapsed Pacifist"}
, {id: 117, name: "Laskuil-Hliz"}
, {id: 118, name: "Lasting Damage"}
, {id: 119, name: "Lasting Damage I"}
, {id: 120, name: "Lasting Damage II"}
, {id: 121, name: "later Sleeper Service"}
, {id: 122, name: "Learned Response"}
, {id: 123, name: "Lightly Seared On The Reality Grill"}
, {id: 124, name: "Limiting Factor"}
, {id: 125, name: "Limivorous"}
, {id: 126, name: "Little Rascal"}
, {id: 127, name: "Liveware Problem"}
, {id: 128, name: "Long View"}
, {id: 129, name: "Low Gravitas Warning Signal"}
, {id: 130, name: "Lucid Nonsense"}
, {id: 131, name: "Me, I'm Counting"}
, {id: 132, name: "Melancholia Enshrines All Triumph"}
, {id: 133, name: "Messenger Of Truth"}
, {id: 134, name: "Minority Report"}
, {id: 135, name: "Misophist"}
, {id: 136, name: "Mistake Not..."}
, {id: 137, name: "Nervous Energy"}
, {id: 138, name: "Never Talk To Strangers"}
, {id: 139, name: "New Toy"}
, {id: 140, name: "No Fixed Abode"}
, {id: 141, name: "No More Mr Nice Guy"}
, {id: 142, name: "No One Knows What The Dead Think"}
, {id: 143, name: "Not Invented Here"}
, {id: 144, name: "Not Wanted On Voyage"}
, {id: 145, name: "Now Look What You've Made Me Do"}
, {id: 146, name: "Now We Try It My Way"}
, {id: 147, name: "Now, Turning to Reason, & Its Just Sweetness"}
, {id: 148, name: "Nuisance Value"}
, {id: 149, name: "Oceanic Dissonance"}
, {id: 150, name: "Of Course I Still Love You"}
, {id: 151, name: "On First Seeing Jhiriit"}
, {id: 152, name: "Only Slightly Bent"}
, {id: 153, name: "Outstanding Contribution to the Historical Process"}
, {id: 154, name: "Passing By And Thought I'd Drop In"}
, {id: 155, name: "Peace Makes Plenty"}
, {id: 156, name: "Pelagian"}
, {id: 157, name: "Perfidy"}
, {id: 158, name: "Piety"}
, {id: 159, name: "Poke It With A Stick"}
, {id: 160, name: "Pressure Drop"}
, {id: 161, name: "Pride Comes Before A Fall"}
, {id: 162, name: "Prime Mover"}
, {id: 163, name: "Problem Child"}
, {id: 164, name: "Profit Margin"}
, {id: 165, name: "Prosthetic Conscience"}
, {id: 166, name: "Pure Big Mad Boat Man"}
, {id: 167, name: "Qualifier"}
, {id: 168, name: "Questionable Ethics"}
, {id: 169, name: "Quiatrea-Anang"}
, {id: 170, name: "Quietly Confident,"}
, {id: 171, name: "Rapid Random Response Unit"}
, {id: 172, name: "Ravished By The Sheer Implausibility Of That Last Statement"}
, {id: 173, name: "Reasonable Excuse"}
, {id: 174, name: "Recent Convert"}
, {id: 175, name: "Reformed Nice Guy"}
, {id: 176, name: "Refreshingly Unconcerned With the Vulgar Exigencies of Veracity"}
, {id: 177, name: "Resistance Is Character-Forming"}
, {id: 178, name: "Revisionist"}
, {id: 179, name: "Riptalon"}
, {id: 180, name: "Rubric Of Ruin"}
, {id: 181, name: "Sacrificial Victim"}
, {id: 182, name: "SacSlicer II"}
, {id: 183, name: "Sanctioned Parts List"}
, {id: 184, name: "Screw Loose"}
, {id: 185, name: "Seed Drill"}
, {id: 186, name: "Sense Amid Madness, Wit Amidst Folly"}
, {id: 187, name: "Serious Callers Only"}
, {id: 188, name: "Shoot Them Later"}
, {id: 189, name: "Size Isn't Everything"}
, {id: 190, name: "Smile Tolerantly"}
, {id: 191, name: "So Much For Subtlety"}
, {id: 192, name: "Sober Counsel"}
, {id: 193, name: "Someone Else's Problem"}
, {id: 194, name: "Soulhaven"}
, {id: 195, name: "Space Monster"}
, {id: 196, name: "Steely Glint"}
, {id: 197, name: "Stood Far Back When The Gravitas Was Handed Out"}
, {id: 198, name: "Stranger Here Myself"}
, {id: 199, name: "Strategic Outreach Element CH2OH.(CHOH)4.CHO"}
, {id: 200, name: "Subtle Shift In Emphasis"}
, {id: 201, name: "Sweet and Full of Grace"}
, {id: 202, name: "Synchronize Your Dogmas"}
, {id: 203, name: "Tactical Grace"}
, {id: 204, name: "Teething Problems"}
, {id: 205, name: "The Ends Of Invention"}
, {id: 206, name: "The Hand of God 137"}
, {id: 207, name: "The Precise Nature Of The Catastrophe"}
, {id: 208, name: "The Usual But Etymologically Unsatisfactory"}
, {id: 209, name: "Thorough But... Unreliable"}
, {id: 210, name: "Total Internal Reflection"}
, {id: 211, name: "Trade Surplus"}
, {id: 212, name: "Transient Atmospheric Phenomenon"}
, {id: 213, name: "Ucalegon"}
, {id: 214, name: "Ultimate Ship The Second"}
, {id: 215, name: "Unacceptable Behaviour"}
, {id: 216, name: "Undesirable Alien"}
, {id: 217, name: "Unfortunate Conflict Of Evidence"}
, {id: 218, name: "Uninvited Guest"}
, {id: 219, name: "Unreliable Witness"}
, {id: 220, name: "Unwitting Accomplice"}
, {id: 221, name: "Use Psychology"}
, {id: 222, name: "Value Judgement"}
, {id: 223, name: "Very Little Gravitas Indeed"}
, {id: 224, name: "Vision Of Hope Surpassed"}
, {id: 225, name: "Vulgarian"}
, {id: 226, name: "Warm, Considering"}
, {id: 227, name: "We Haven't Met But You're A Great Fan Of Mine"}
, {id: 228, name: "Well I Was In The Neighbourhood"}
, {id: 229, name: "What Are The Civilian Applications?"}
, {id: 230, name: "What Is The Answer and Why?"}
, {id: 231, name: "Wingclipper"}
, {id: 232, name: "Winter Storm"}
, {id: 233, name: "Wisdom Like Silence"}
, {id: 234, name: "Within Reason"}
, {id: 235, name: "Xenoclast"}
, {id: 236, name: "Xenocrat"}
, {id: 237, name: "Xenoglossicist"}
, {id: 238, name: "Xenophobe"}
, {id: 239, name: "Yawning Angel"}
, {id: 240, name: "You Call This Clean?"}
, {id: 241, name: "You May Not Be The Coolest Person Here"}
, {id: 242, name: "You Naughty Monsters"}
, {id: 243, name: "You Would If You Really Loved Me"}
, {id: 244, name: "You'll Clean That Up Before You Leave"}
, {id: 245, name: "You'll Thank Me Later"}
, {id: 246, name: "Youthful Indiscretion"}
, {id: 247, name: "Zealot"}
, {id: 248, name: "Zero Credibility"}
, {id: 249, name: "Zero Gravitas"}
, {id: 250, name: "Zoologist"}
]

var bootstrapClasses = {
  filter: 'form-control'
, select: 'form-control'
, button: 'btn btn btn-block btn-default'
, buttonActive: 'btn btn btn-block btn-primary'
}

var BasicSelection = React.createClass({
  getInitialState() {
    return {
      selectedOptions: []
    }
  },

  _onSelectionChange(selectedOptions) {
    selectedOptions.sort((a, b) => a.id - b.id)
    this.setState({selectedOptions})
  },

  _onDeselect(index) {
    var selectedOptions = this.state.selectedOptions.slice()
    selectedOptions.splice(index, 1)
    this.setState({selectedOptions})
  },

  _onClearSelection() {
    this.setState({selectedOptions: []})
  },

  render() {
    var {selectedOptions} = this.state
    return <div className="row">
      <div className="col-md-5">
        <FilteredMultiSelect
          classNames={bootstrapClasses}
          onChange={this._onSelectionChange}
          options={CULTURE_SHIPS}
          selectedOptions={selectedOptions}
          textProp="name"
          valueProp="id"
        />
        <p className="help-block">Press Enter when there's only one matching item to select it.</p>
      </div>
      <div className="col-md-5">
        {selectedOptions.length === 0 && <p>(nothing selected yet)</p>}
        {selectedOptions.length > 0 && <ol>
          {selectedOptions.map((ship, i) => {
            return <li key={ship.id}>
              {ship.name}{' '}
              <span style={{cursor: 'pointer'}} onClick={this._onDeselect.bind(null, i)}>
                &times;
              </span>
            </li>
          })}
        </ol>}
        {selectedOptions.length > 0 && <button style={{marginLeft: 20}} className="btn btn-default" onClick={this._onClearSelection}>
          Clear Selection
        </button>}
      </div>
    </div>
  }
})

var AddRemoveSelection = React.createClass({
  getInitialState() {
    return {
      selectedOptions: []
    }
  },

  _onSelect(selectedOptions) {
    selectedOptions.sort((a, b) => a.id - b.id)
    this.setState({selectedOptions})
  },

  _onDeselect(deselectedOptions) {
    var selectedOptions = this.state.selectedOptions.slice()
    deselectedOptions.forEach(option => {
      selectedOptions.splice(selectedOptions.indexOf(option), 1)
    })
    this.setState({selectedOptions})
  },

  render() {
    var {selectedOptions} = this.state
    return <div className="row">
      <div className="col-md-5">
        <FilteredMultiSelect
          buttonText="Add"
          classNames={bootstrapClasses}
          onChange={this._onSelect}
          options={CULTURE_SHIPS}
          selectedOptions={selectedOptions}
          textProp="name"
          valueProp="id"
        />
      </div>
      <div className="col-md-5">
        <FilteredMultiSelect
          buttonText="Remove"
          classNames={{
            filter: 'form-control'
          , select: 'form-control'
          , button: 'btn btn btn-block btn-default'
          , buttonActive: 'btn btn btn-block btn-danger'
          }}
          onChange={this._onDeselect}
          options={selectedOptions}
          textProp="name"
          valueProp="id"
        />
      </div>
    </div>
  }
})

var App = React.createClass({
  render() {
    return <div className="container">
      <div className="row header">
        <div className="col-md-12">
          <h1><a href="https://github.com/insin/react-filtered-multiselect">React &lt;FilteredMultiSelect/&gt;</a></h1>
          <p className="lead">A reusable React component for making and adding to selections using a filtered multi-select.</p>
        </div>
      </div>

      <h2>Basic Selection</h2>
      <p>Select some ships from <a href="http://en.wikipedia.org/wiki/The_Culture">The Culture</a>.</p>
      <BasicSelection/>

      <h2>Add &amp; Remove</h2>
      <p>Move items from one <code>&lt;FilteredMultiSelect/&gt;</code> to another and back again.</p>
      <AddRemoveSelection/>
    </div>
  }
})

React.render(<App/>, document.body)

}()