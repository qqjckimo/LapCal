define([
        'react',
        'react-dom',
        'react-addons-update'
    ],
    function(
        React,
        ReactDOM,
        ReactUpdate
    ) {
        var Counter = React.createClass({

            getDefaultProps: function() {
                return {
                };
            },
            getInitialState: function() {
                return {
                    num_str: ""
                };
            },
            _update_data: function(key, value) {
                // clamp
                if(value < 0 ) {
                    value = 0;
                } else if( value > this.props.total_lap)  {
                    value = this.props.total_lap;
                }

                // notify data change
                this.props.notifyManagerSingleData(key, value);
            },
            onSetPress: function(e) {
                e.preventDefault();
                if(this.state.num_str){
                    if(!this.props.data.hasOwnProperty(this.state.num_str)) {
                        this.props.data[this.state.num_str] = 0;
                    }

                    var value = this.props.data[this.state.num_str];

                    // increase lap value
                    value += 1;

                    this._update_data(this.state.num_str, value);
                    
                    // clear current
                    this.setState({num_str: ""});
                }
            },
            onChangeSingleData: function(delta) {
                var pre_value = this.props.data[this.state.edit_target];
                var value = this.props.data[this.state.edit_target];
                // edit
                value += delta;

                // update
                this._update_data(this.state.edit_target, value);

                // set value
                this.refs.edit_value.value = value;
            },
            onSetNum: function(num) {
                // using string to append number at the end
                var newStr = this.state.num_str + num;
                this.setState({num_str: newStr});
            },
            onNumChange: function(){
                this.setState({num_str: this.refs.numInput.value});
            },
            onDelPress: function() {
                var str_len = this.state.num_str.length;
                if(str_len > 0) {
                    this.setState({num_str: this.state.num_str.substr(0, str_len-1)});
                }
            },
            onAllPress: function() {
                this.props.notifyManagerAddWholeLap();
            },
            onEditPress: function() {
                if(!this.props.data.hasOwnProperty(this.state.num_str)) {
                    this.refs.edit_value.value = 0;
                }

                this.setState({
                    edit: true, 
                    edit_target: this.state.num_str,
                    num_str: ""
                });
            },
            onEditDonePress: function() {
                this.setState({
                    edit: false, 
                    edit_target: "",
                    num_str: ""
                });
            },
            shouldComponentUpdate: function(nextProps, nextState) {
                this.refs.numInput.value = nextState.num_str;
                return true;
            },
            render: function() {
                
                // style variable
                var numbtn_cls = "btn";
                var smallbtn_cls = "btn ";
                var fullWidth = {width: '100%'};
                var btn_stytle = {height: '100%', width: '100%'};
                var fullDim = {height: '100%', width: '100%'};
                
                // button state of add-all btn
                var canAddAll = true;
                for(var key in this.props.data) {
                    if(this.props.data[key] > 0) {
                        canAddAll = false;
                        break;
                    }
                }
                
                var disableDel = true;
                if(this.state.num_str) {
                    disableDel = false;
                }

                // ui of edit
                var editor = [];
                if(this.state.edit) {
                    editor.push(
                        <div key="editor">
                            <h5>編輯跑者圈數</h5>
                            <div className="input-group">
                                  <span className="input-group-addon" id="basic-addon1">{this.state.edit_target} 號, 圈數=</span>
                                  <input type="tel" className="form-control" disabled="true" aria-describedby="basic-addon1" ref="edit_value" value={this.props.data[this.state.edit_target]} />
                            </div>
                            <table style={fullDim}>
                                <tbody>
                                    <tr>
                                        <td><button className={numbtn_cls} style={btn_stytle} onClick={this.onChangeSingleData.bind(null, 1)}> + </button></td>
                                        <td><button className={numbtn_cls} style={btn_stytle} onClick={this.onChangeSingleData.bind(null, -1)}> - </button></td>
                                        <td><button className={numbtn_cls} style={btn_stytle} onClick={this.onEditDonePress}> Done </button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        );
                }

                return (
                    <div className="row">
                        <div className="col-xs-4">
                            <h5>輸入跑者號碼</h5>
                            <form className="form-group" onSubmit={this.onSetPress}>
                                <input className="form-control" type='tel' ref="numInput" onChange={this.onNumChange}/>
                            </form>
                            <table style={fullDim}>
                                <tbody>
                                    <tr>
                                        <td><button className={numbtn_cls} style={btn_stytle} onClick={this.onSetNum.bind(null, 1)}>1</button></td>
                                        <td><button className={numbtn_cls} style={btn_stytle} onClick={this.onSetNum.bind(null, 2)}>2</button></td>
                                        <td><button className={numbtn_cls} style={btn_stytle} onClick={this.onSetNum.bind(null, 3)}>3</button></td>
                                        <td><button className={smallbtn_cls} style={btn_stytle} disabled={disableDel} onClick={this.onDelPress}>Del</button></td>
                                    </tr>
                                    <tr>
                                        <td><button className={numbtn_cls} style={btn_stytle} onClick={this.onSetNum.bind(null, 4)}>4</button></td>
                                        <td><button className={numbtn_cls} style={btn_stytle} onClick={this.onSetNum.bind(null, 5)}>5</button></td>
                                        <td><button className={numbtn_cls} style={btn_stytle} onClick={this.onSetNum.bind(null, 6)}>6</button></td>
                                        <td rowSpan="2"><button className={numbtn_cls} style={btn_stytle} disabled={disableDel} onClick={this.onSetPress}>Enter</button></td>
                                    </tr>
                                    <tr>
                                        <td><button className={numbtn_cls} style={btn_stytle} onClick={this.onSetNum.bind(null, 7)}>7</button></td>
                                        <td><button className={numbtn_cls} style={btn_stytle} onClick={this.onSetNum.bind(null, 8)}>8</button></td>
                                        <td><button className={numbtn_cls} style={btn_stytle} onClick={this.onSetNum.bind(null, 9)}>9</button></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td><button className={numbtn_cls} style={btn_stytle} onClick={this.onSetNum.bind(null, 0)}>0</button></td>
                                        <td></td>
                                        <td><button className={smallbtn_cls} style={btn_stytle} disabled={this.props.disableUndo} onClick={this.props.notifyManagerUndo}>Undo</button></td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3"><button className={numbtn_cls} disabled={!canAddAll} style={btn_stytle}  onClick={this.onAllPress}>全部加一圈</button></td>
                                        <td><button className={smallbtn_cls} style={btn_stytle} disabled={this.state.num_str.length == 0} onClick={this.onEditPress}>Edit</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-xs-5">
                            {editor}
                        </div>
                    </div>
                );
            }
        });

        return Counter;
    }
);