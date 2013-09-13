Ext.define('MVC.Game',{
    field_size: 4,
    shuffle_count: 100,
    allow_game_over_check: false,

    run: function(){
        this.render_buttons();
        this.shuffle_buttons();
    },

    draw_field: function() {

        var grid = {
            tag: 'table',
            children:[]
        };

        for (var y=1; y<=this.field_size; y++) {
            var tr = {
                tag:'tr',
                children:[]
            };
            for (var x=1; x<=this.field_size; x++) {
                tr.children.push({
                    tag: 'td',
                    id:'g'+x+y,
                    html:''
                });
            }
            grid.children.push(tr);
        }

        return Ext.DomHelper.markup(grid);
    },

    render_buttons: function(){
        for (var y=1; y<=this.field_size; y++)
        {
            for (var x=1; x<=this.field_size; x++)
            {
                if (y==this.field_size && x==this.field_size) continue;
                var b = Ext.create('Ext.Button',{
                    x:x,
                    y:y,
                    game: this,
                    correct_parent_id:'g'+x+y,
                    text:(this.field_size*(y-1))+x,
                    renderTo:'g'+x+y,
                    overCls:'',
                    focusCls:'',
                    cls:'grid-btn',
                    width:50,
                    height:50,

                    handler:function(){
                        var moves = [
                            {x:this.x+1, y:this.y}, {x:this.x-1, y:this.y},
                            {x:this.x, y:this.y+1}, {x:this.x, y:this.y-1}
                        ];
                        for (var i in moves) {
                            var n = moves[i]; // n = neighbor
                            if (n.x>this.field_size || n.x<0) continue;
                            if (n.y>this.field_size || n.y<0) continue;
                            var n_el = Ext.get('g'+n.x+n.y);
                            if (n_el!=null && n_el.child('>')==null) {
                                this.el.appendTo('g'+n.x+n.y);
                                this.x = n.x;
                                this.y = n.y;
                                break;
                            }
                        }
                        this.game.check_for_game_over();
                    }
                });

                // фикс, чтобы выровнять по сетке
                b.el.applyStyles({ position:'static', left:0, top:0 });

            }
        }
    },

    check_for_game_over: function(){
        if (!this.allow_game_over_check) return;
        if (Ext.query('td:empty')[0].id!='g'+this.field_size+this.field_size) return;

        var game_over = true;
        for (var y=1; y<=this.field_size; y++)
        {
            for (var x=1; x<=this.field_size; x++)
            {
                if (y==this.field_size && x==this.field_size) continue;
                var parent_id = 'g'+x+y;
                var button = Ext.get(parent_id).child('.grid-btn')
                if (button==null || Ext.getCmp(button.id).correct_parent_id!=parent_id) {
                    game_over = false;
                    break;
                }
            }
            if (!game_over) break;
        }
        if (game_over) {
            Ext.Msg.confirm('Message','Game over. Shuffle?', function(btn){
                if (btn=='yes') {
                    Ext.create('MVC.Game').shuffle_buttons();
                }
            });
        }
    },

    shuffle_buttons:function() {
        this.allow_game_over_check = false;
        for (var i=0; i<this.shuffle_count; i++)
        {
            var xy = parseInt(Ext.query('td:empty')[0].id.substring(1));
            var x = Math.floor(xy/10);
            var y = xy-x*10;
            var r = Math.floor((Math.random()*10)+1);
            var rn = Math.floor((Math.random()*10)+1);
            if (r>5) {
                if (rn>5) {
                    if ((x-1)>0) x--; else x++;
                } else {
                    if ((x+1)<=this.field_size) x++; else x--;
                }
            } else {
                if (rn>5) {
                    if ((y-1)>0) y--; else y++;
                } else {
                    if ((y+1)<=this.field_size) y++; else y--;
                }
            }
            var btn = Ext.query('td#g'+x+y+' .grid-btn');
            if (btn.length>0) btn[0].click();
        }
        this.allow_game_over_check = true;
    }

});
