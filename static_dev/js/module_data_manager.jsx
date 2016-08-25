define([
        'react',
        'react-dom',
        'react-addons-update',
        './module_counter.jsx',
        './module_table.jsx'
    ],
    function(
        React,
        ReactDOM,
        ReactUpdate,
        LapCounter,
        LapTable
    ) {
        var LapCounterManager = React.createClass({
            
            getDefaultProps: function() {
                return {
                    total_lap: 13
                };
            },
            getInitialState: function() {
                return {
                    data: {},
                    whole_lap: 0,
                    undo_stack_size: 15,
                    undo_stack: []
                };
            },
            onDataChange: function(key, value) {
                
                // add complete data to rank list
                if( (value + this.state.whole_lap) == this.props.total_lap) {
                    if(!this.state.data.hasOwnProperty('rank')) {
                        this.state.data['rank'] = [];
                    }
                    if(this.state.data['rank'].indexOf(key) < 0) {
                        this.state.data['rank'].push(key);
                    }
                }
                // clamp max value of lap 
                else if( (value + this.state.whole_lap) > this.props.total_lap) {
                    value = this.props.total_lap;
                }

                var data_changes = true;
                if(this.state.data.hasOwnProperty(key)) {
                    data_changes = (this.state.data[key] != value);
                }

                // record before change
                if(data_changes) {
                    this.state.undo_stack.push( ReactUpdate({}, {$merge:this.state.data}) );

                    if(this.state.undo_stack.length > this.state.undo_stack_size) {
                        this.state.undo_stack.unshift();
                    }
                }

                // change data
                this.state.data[key] = value;
                this.forceUpdate();
            },
            onAddWholeLap: function(){
                var all_laps_zero = Object.keys(this.state.data).length == 0;
                if(!all_laps_zero) {
                    all_laps_zero = true;
                    for(var key in this.state.data) {
                        if(this.state.data[key] > 0) {
                            all_laps_zero = false;
                            break;
                        }
                    }
                }

                if(all_laps_zero) {
                    this.setState({whole_lap: (this.state.whole_lap + 1)});
                }
            },
            onUndo: function() {
                var target_obj = this.state.undo_stack.pop();
                this.setState({data: target_obj});
            },
            render: function() {
                var debug_str_data = JSON.stringify(this.state.data);
                var debug_str_undo_stack = JSON.stringify(this.state.undo_stack);

                return (
                    <div className="container">
                        {/*<div>{debug_str_data}</div>*/}
                        {/*<div>{debug_str_undo_stack}</div>*/}
                        <div className="row">
                            <div className="col-xs-12">
                                <LapTable   total_lap={this.props.total_lap} 
                                            whole_lap={this.state.whole_lap} 
                                            data={this.state.data} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                <LapCounter total_lap={this.props.total_lap}
                                            whole_lap={this.state.whole_lap} 
                                            data={this.state.data}
                                            disableUndo={this.state.undo_stack.length == 0}
                                            notifyManagerSingleData={this.onDataChange} 
                                            notifyManagerAddWholeLap={this.onAddWholeLap}
                                            notifyManagerEditData={this.onEditSingleData}
                                            notifyManagerUndo={this.onUndo}/>
                            </div>
                        </div>
                    </div>
                );
            }
        });

        ReactDOM.render(<LapCounterManager />, document.getElementById('content'));
    }
);