var appData = [
    { name: "Mark-Paul Gosselaar", photo_url: "", id:"1" },
    { name: "Delta Burke", photo_url: "images/avatars/delta.png", id:"2"  },
    { name: "Alf", photo_url: "images/avatars/alf.png", id:"3"  },
    { name: "Jaleel White", photo_url: "images/avatars/jaleel.png", id:"4"  },
    { name: "Ralph Macchio", photo_url: "images/avatars/ralph.png", id:"5"  },
    { name: "Candace Cameron", photo_url: "images/avatars/candace.png", id:"6"  },
    { name: "Patrick Duffy", photo_url: "images/avatars/pduff.png", id:"7"  },
    { name: "Arnold Schwartzengger", photo_url: "images/avatars/arnold.png", id:"8"  }
];

function veryBadFindAndRemoveFromArrayByID(ID){
    var i = 0,
        len = appData.length;
    for(i;i<len;i++){
        if(appData[i].id === ID){
            appData.splice(i,1);
            return;
        }
    }
}


var MainContent = React.createClass({

    render: function() {
        return (
            <div id="main-content">
                <FormExample data={this.props.data} />
                <hr/>
                <div id="personGrid" className="gridContainer"/>
            </div>
        );
    }
});

var FormExample = React.createClass({

    onClickHandler:function(evt){
        evt.preventDefault();
        var newPerson = {
            name:document.getElementById('Full Name_Input').value,
            photo_url:document.getElementById('Photo URL_Input').value,
            id: Math.floor(Math.random()*100000000 + 1).toString()
        };

        appData.unshift(newPerson);

        React.render(
            <GridContainer data={appData} />,
            $('#personGrid')[0]
        );
    },

    render: function() {
        var reset = true;
        var handle = this.onChangeHandler;
        return (
            <form>
                {this.props.data.map(function(m,idx){
                    return <LabelInput label={m.label}/>
                })}
                <button onClick={this.onClickHandler}>Create</button>
            </form>
        );
    }
});

var LabelInput = React.createClass({

    getInitialState: function() {
        return {
            value:""
        };
    },

    onChangeHandler:function(evt){
      this.setState({value:evt.target.value});
    },


    render: function() {
        return (
            <div>
                <label>{ this.props.label}</label>
                <input id={this.props.label + "_Input"} onChange={this.onChangeHandler} value={this.state.value} />
            </div>
        );
    }
});


var GridContainer = React.createClass({
    render: function() {
        return (
            <div className="gridContainer">
                    {this.props.data.map(function(m,idx){
                        return <GridItem data={m} />
                    })}
            </div>
        );
    }
});

var GridItem = React.createClass({
    render: function() {
        return (
            <div className="grid_item">
                <div className="grid_item_container">
                    <LeftPictureFrame photo_url={this.props.data.photo_url} />
                    <RightPictureFrame data={this.props.data} />
                </div>
            </div>
        );
    }
});


var LeftPictureFrame = React.createClass({
    render: function() {
        return (
            <div className="person_left_container">
                <div className="image_container">
                    <img src={this.props.photo_url ? this.props.photo_url : '/images/default.png'} />
                </div>
            </div>
        );
    }
});


var RightPictureFrame = React.createClass({

    removeGridItem:function(evt){
        veryBadFindAndRemoveFromArrayByID(evt.target.getAttribute('data-personid'));
        React.render(
            <GridContainer data={appData} />,
            $('#personGrid')[0]
        );
    },

    render: function() {
        return (
            <div className="person_right_container">
                <div className="grid_item_close_container">
                    <button className="close_btn" data-personid={this.props.data.id} onClick={this.removeGridItem}></button>
                </div>
                <label>{this.props.data.name}</label>
            </div>
        );
    }
});


React.render(
    <MainContent data={[
        {label:"Full Name",type:"input"},
        {label:"Photo URL",type:"input"}
        ]} />,
   document.body
);

React.render(
    <GridContainer data={appData} />,
    $('#personGrid')[0]
);

