import React, { Component } from 'react';

export default class TagInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tagsInputValue: '',
            tags: []    
        } 
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    addTag = (tag) => {
		if (tag == '') return;
		tag = tag.trim();
		if(!(this.state.tags.indexOf(tag) > -1)) {
			let tags = this.state.tags.concat([tag]);
			this.updateTags(tags);
		}
		this.updateTagValue('');
    }
    handleKeyPress(event){
        if(event.key == " "){
            this.addTag(event.target.value);
        }
        
    }
    
    updateTagValue = (value) => {
		if(value == ' ') {
			return;
		}
		this.setState({
			tagsInputValue: value
		})
    }
    removeTag = (removeTag) => {
		let tags = this.state.tags.filter((tag) => tag !== removeTag);
		this.updateTags(tags);
	}
	updateTags = (tags) => {
		this.setState({
			tags
		})
	}
    render() {
        const {tagsInputValue, tags} = this.state;
        return (
            <div>
                <div className="form-group">
                    <input className="form-control" value={tagsInputValue} onChange={(e) => {
                        this.updateTagValue(e.target.value);
                        this.props.UpdateTagsParent(tags);
                        }} type="text" placeholder="Tags seperated by space"
                        onKeyPress={this.handleKeyPress} />
                </div>
                <div>
                    {tags && tags.map((tag, index) => <p key={index}>{tag}</p>)}
                </div>
            </div>
        );
    }
}
