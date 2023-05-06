import React from "react";
import {
  Dialog,
  Button,
  DialogActions,
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';

import { makeStyles } from '@material-ui/core/styles';
import { BarChartOutlined as ChartIcon } from "@material-ui/icons";

import ReactECharts from 'echarts-for-react';

export type TPaperMatrix = {
    VISTags: string[],
    MLTags: string[],
    VISData: number[],
    MLData: number[],
    matrix: [number, number, number|undefined][]
} 


const useStyles = makeStyles({
    dialogInfo: {
      padding: '20px',
    },
    openButton: {
        margin: '20px',
        backgroundColor: 'black',
        color: 'white'
    },
    flexContainer: {
        display: 'flex',
        flexWrap: 'wrap'
      },
  });
  
type Props = {
    paperYear: {[k:string]: number};
    paperArea: {[k:string]: number};
    paperMatrix: TPaperMatrix
}

export function ChartModal(props: Props) {
    const { paperArea, paperYear, paperMatrix } =props

    const {MLTags, VISTags, MLData, VISData, matrix} = paperMatrix

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    const years = Object.keys(paperYear).sort((a,b)=>parseInt(a)-parseInt(b))

    const yearOption = {
        title: {
            text: 'Count by Year',
          },
        xAxis: {
          type: 'category',
          data: years
        },
        yAxis: {
          type: 'value'
        },
        label: {
            show: true,
            position: 'top',
            fontSize:12,
            width: 40,
            height: 40
        },
        series: [
          {
            data: years.map(y=>paperYear[y]),
            type: 'bar'
          }
        ]
      }

      const areas = Object.keys(paperArea).sort((a,b)=>paperArea[a] - paperArea[b])

      const areaOption = {
        title: {
            text: 'Count by Venue',
          },
        xAxis: {
          type: 'category',
          data: areas,
          axisLabel: {
            interval: 0,
            rotate: -40
            }
        },
        label: {
            show: true,
            position: 'top',
            fontSize:12,
            width: 40,
            height: 40
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: areas.map(a=>paperArea[a]),
            type: 'bar'
          }
        ]
      }

    // get option for matrix
    const cellWidth = 25, topMargin = 150, leftMargin = 200, barHeight = 80, legendWidth = 15

    const midGrid= {
              width: cellWidth*MLTags.length,
              height: cellWidth*VISTags.length,
              top: topMargin,
              left: leftMargin + legendWidth,
              id: "matrixGrid"
          }

    const bottomGrid = {
        height: barHeight,
        top:midGrid.top+midGrid.height,
        left:midGrid.left,
        width:midGrid.width,
        id:"mlBarGrid"
    }
    
    const rightGrid = {
        left: midGrid.left+midGrid.width,
        top:midGrid.top,
        height:midGrid.height,
        width: barHeight,
        id:"visBarGrid",
    }

    const matrixOption = {
        title: {
            text: "Align ML Capabilities with VIS Needs",
            subtext: `Note that the number on a bar can be smaller than the sum of the numbers in the corresponding row/column, \nbecause some papers involve multiple learning tasks or visualization processes.`
        },
        animation: false,
        grid: [midGrid, bottomGrid, rightGrid],
        xAxis: [
            {
                type: 'category',
                position:'top',
                // data:['a','b','c','d','e','f'],
                data: MLTags,
                axisLabel:{
                    fontSize: 12,
                    rotate:-40,
                    interval: 0,
                },
                splitArea: {
                    show: false
                },
                splitLine:{
                    show: true
                },
                axisLine:{
                    show:false
                },
                axisTick:{
                    show:false
                },
                gridId: "matrixGrid"
            },
            {
                type: 'category',
                position:'top',
                // data:['a','b','c','d','e','f'],
                data: MLTags,
                show:false,
                gridId: 'mlBarGrid'
                // splitArea: {
                //     show: true
                // }
            },
            {
            type: 'value',
            show:false,
            // name:'paper number',
            axisLabel:{
                fontSize: 20
            },
            gridId: 'visBarGrid'
            }
        ],
        yAxis: [
            {
                type: 'category',
                data: VISTags,
                inverse: true,
                axisLabel:{
                    fontSize: 12
                },
                splitArea:{
                    show:false
                },
                splitLine:{
                    show: true
                },
                axisLine:{
                    show:false
                },
                axisTick:{
                    show:false
                },
                gridId: 'matrixGrid'
            },
            {
                type: 'value',
                axisLabel:{
                    fontSize: 20
                },
                gridId: 'mlBarGrid',
                inverse:true,
                show:false
            },
            {
            type: 'category',
            data: VISTags,
            gridId: 'visBarGrid',
            inverse: true,
            show:false}
        ],
        visualMap: {
            min: 0,
            max: Math.max(...matrix.map(d=> d[2]??0 )),
            calculable: true,
            orient: 'vertical',
            align: 'right',
            inRange: {
                // color: ['#BDD7EE','#2E75B6', '#2E75B6',"#1F4E79"],
                // color:['#ADEDED','#4B8C8C','#4B8C8C'],
                color:['#eee','#666','#222'],
                symbolSize: [5, 10]
            },
            left: 0,
            top: topMargin,
        },
        series: [
            {
            name: 'ml4vis',
            type: 'heatmap',
            data: matrix,
            label: {
                show: true,
                fontSize: 12
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            xAxisIndex: 0,
            yAxisIndex: 0,
            
        }, {
            type:'bar',
            data:MLData.map(d=>{
                return {
                    value:d,
                    visualMap:false
                }
            }),
            label: {
                    show: true,
                    position: 'bottom',
                    fontSize:12,
                    width: 40,
                    height: 40
                },
            itemStyle:{
                color: "#ED7D31",
                opacity: 0.6,
            },
            yAxisIndex:1,
            xAxisIndex:1
        }, {
            // name:'ml paper number',
            type:'bar',
            data:VISData.map(d=>{
                return {
                    value:d,
                    visualMap:false
                }
            }),
            label: {
                    show: true,
                    position: 'right',
                    fontSize:12
                },
            itemStyle:{
                color: "#2D8FE9",
                opacity: 0.6,
            },
            xAxisIndex:2,
            yAxisIndex:2,
        }
        ]
    };;
  
    return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} className={classes.openButton} startIcon={<ChartIcon/>}>
       Open Summary Dialog
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} fullWidth={true} maxWidth='lg'>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
        <Alert severity="warning">
            While we try our best to maintain and update this webpage, papers published after 2020 Oct are not surveyed exhaustively. 
            <br/>
            Therefore, the statistical summary should be treated with cautions. 
            <br/>
            If you find an interesting ML4VIS paper, feel free to <a target='_blank' href={`https://github.com/ML4VIS/ML4VIS.github.io/issues/new?assignees=&labels=enhancement&template=suggest-new-ml4vis-papers.md&title=Suggest+Paper%3A+%5Bpaper+title%5D`}>create a PR in our github repo</a>!
        </Alert>

        <div className={classes.flexContainer}>
        
            <ReactECharts
                option={yearOption}
                style={{height: 300, width: '40%', padding: '10px'}}
                notMerge={true}
                lazyUpdate={true}
            />

     
            <ReactECharts
                option={areaOption}
                style={{height: 300, width: '60%', padding: '10px'}}
                notMerge={true}
                lazyUpdate={true}
            />

            <ReactECharts
                option={matrixOption}
                style={{height: 450, width: '50%', padding: '10px'}}
                notMerge={true}
                lazyUpdate={true}
            />
        </div>
      </Dialog>
    </div> 
    );
  }