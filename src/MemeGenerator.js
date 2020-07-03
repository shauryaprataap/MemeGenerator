import React, { Component } from "react";

class MemeGenerator extends Component {
  state = {
      topText: "",
      bottomText: "",
      randomImage: "http://i.imgflip.com/1bij.jpg",
      allMemeImg: []
    };

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(res => {
        const { memes } = res.data;

        this.setState({
          allMemeImg: memes
        });
      });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const randNum = Math.floor(Math.random() * this.state.allMemeImg.length);
    const randMemeImg = this.state.allMemeImg[randNum].url;
    this.setState({ randomImage: randMemeImg });
  };

  render() {
    return (
      <div>
        <form className="meme-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="topText"
            placeholder="TopText"
            value={this.state.topTeaxt}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="bottomText"
            placeholder="BottomText"
            value={this.state.topTeaxt}
            onChange={this.handleChange}
          />
          <button>Generate</button>
        </form>
        <div className="meme">
          <img src={this.state.randomImage} alt="" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
