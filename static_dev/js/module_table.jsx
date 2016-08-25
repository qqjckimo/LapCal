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
        var Table = React.createClass({
            getDefaultProps: function() {
                return {
                    whole_lap: 0
                };
            },
            getInitialState: function() {
                return {
                };
            },
            componentWillReceiveProps: function(nextProps) {
            },
            onEraseSingleRecord: function() {

            },
            _render_data_in_row: function() {
                // header
                var header = [];
                var total_lap = this.props.total_lap;
                for(var i=total_lap; i > 2; --i) {
                    header.push(<th key={'head_'+i}>{i}</th>);
                }
                // remains 1 lap
                header.push(<th key={'head_'+2}>final lap<br/><span className="badge">2</span></th>);
                // going to complete
                header.push(<th key={'head_'+1}>complete<br/>1</th>);

                // lap count
                var rows = [];
                var data_array = [];
                for( var key in this.props.data ) {
                    var data_obj = {};
                    data_obj['name'] = key;
                    data_obj['lap'] = this.props.data[key];
                    data_array.push(data_obj);
                }
                data_array.sort(function(a, b){
                    // lap in decending order
                    var lap_result = (b.lap - a.lap);
                    if(lap_result == 0){
                        // name in ascending order
                        return (parseInt(a.name) - parseInt(b.name));
                    }else {
                        return lap_result;
                    }
                });

                var whole_lap = this.props.whole_lap;
                data_array.forEach(function(data, d_index){
                    if(data.lap <= 0) {
                        return;
                    }

                    var cols = [];
                    var i = 0;
                    for(i = 0; i < whole_lap; ++i) {
                        cols.push(<td key={'lap_' + i.toString()}>{data.name}</td>)
                    }

                    for(i = 0; i < data.lap; ++i) {
                        cols.push(<td key={'lap_' + (i + whole_lap)}>{data.name}</td>)
                    }

                    if(data.lap == (total_lap - 1)) {
                        cols[cols.length-1] = <td key={'lap_' + (i + whole_lap)}><span className="badge">{data.name}</span></td>
                    }

                    rows.push(<tr key={'name_' + data.name}>{cols}</tr>);
                });

                return (
                    <div>
                        <h5>計圈表</h5>
                        <table className="table table-condensed">
                            <thead>
                                <tr>
                                {header}
                                </tr>
                            </thead>
                            <tbody>
                                {rows}
                            </tbody>
                        </table>
                    </div>
                );
            },
            _render_data_in_col: function() {
                // 
                var rows = [];
                var total_lap = this.props.total_lap;
                var whole_lap = this.props.whole_lap;

                var data_array = [];
                for( var key in this.props.data ) {
                    if( isNaN(parseInt(key)) || this.props.data[key] == 0){
                        continue;
                    }
                    var data_obj = {};
                    data_obj['name'] = key;
                    data_obj['lap'] = this.props.data[key];
                    data_array.push(data_obj);
                }
                data_array.sort(function(a, b){
                    // lap in decending order
                    var lap_result = (b.lap - a.lap);
                    if(lap_result == 0){
                        // name in ascending order
                        return (parseInt(a.name) - parseInt(b.name));
                    }else {
                        return lap_result;
                    }
                });

                var cols = [];
                var final_datas = [];
                var complete_datas = [];
                var num_cell = 0;

                // counting lap
                data_array.forEach(function(data, d_index){
                    var lap_remains = total_lap - whole_lap - data.lap;
                    if( lap_remains == 1) {
                        final_datas.push(data);
                        cols.push(<td key={'counting_data_' + data.name}></td>);

                    } else if (lap_remains <= 0 ) {
                        cols.push(<td key={'counting_data_' + data.name}></td>);
                    } else {
                        lap_remains = '-' + lap_remains;
                        cols.push(<td key={'counting_data_' + data.name}>{data.name}<br/><span className="badge">{lap_remains}</span></td>)
                    }
                    num_cell++;
                });

                var whole_lap_element = [];
                if(whole_lap) {
                    whole_lap_element.push(<span key={"whole_lap_badge"} className="badge">+{whole_lap}</span>);
                }
                rows.push(
                    <tr key={'head_counting'}>
                        <td className="text-muted">
                            <span className="glyphicon glyphicon-hourglass" aria-hidden="true"></span>
                            {whole_lap_element}
                        </td>
                        {cols}
                    </tr>);

                // final lap
                if(this.props.data.hasOwnProperty('rank')) {
                    complete_datas = this.props.data.rank;
                }

                var num_empty_cell = complete_datas.length;
                cols = [];
                for(var i=0; i<num_empty_cell; ++i){
                    cols.push(<td key={"pre_empty_final_cell_" + i}></td>)
                }

                final_datas.forEach(function(data, d_index){
                    cols.push(<td key={'final_data_' + data.name}>{data.name}<br/><span className="badge">final</span></td>);
                });

                num_empty_cell = num_cell-cols.length;
                for(var i=0; i<num_empty_cell; ++i){
                    cols.push(<td key={"sub_empty_final_cell_" + i}></td>)
                }

                rows.push(
                    <tr key={'head_final'}>
                        <td className="text-muted"><span className="glyphicon glyphicon-flag" aria-hidden="true"></span></td>
                        {cols}
                    </tr>);

                // going to complete
                cols = [];
                complete_datas.forEach(function(num_str, n_index){
                    cols.push(<td key={'complete_data_' + num_str}>{num_str}<br/></td>);
                });

                num_empty_cell = num_cell-cols.length;
                for(var i=0; i<num_empty_cell; ++i){
                    cols.push(<td key={"empty_complete_cell_" + i}></td>)
                }

                rows.push(
                        <tr key={'head_complete'}>
                            <td className="text-muted"><span className="glyphicon glyphicon-dashboard" aria-hidden="true"></span></td>
                            {cols}
                        </tr>);

                // render
                return (
                    <div>
                        <h5>計圈表</h5>
                        <table className="table table-condensed">
                            <tbody>
                                {rows}
                            </tbody>
                        </table>
                    </div>
                );
            },
            render: function() {
                return this._render_data_in_col();
            }
        });

        return Table;
    }
);