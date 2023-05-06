import { makeStyles, fade, createStyles, Theme } from '@material-ui/core/styles';

const drawerWidth = 360;

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
              },
        },
        drawerPaper: {
            width: drawerWidth,
            padding: '0 12px'
        },
        drawerContainer: {
            overflow: "auto",
        },


        paperNumber: {
            textAlign: 'left',
            margin: '10px'
        },

        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            margin: '12px 0'
        },
        searchIcon: {
            padding: theme.spacing(0, 1),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },

        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%'
        },


        filterTitle: {
            margin: '12px 0',
            paddingLeft: 8
        },
        filters: {
            display: 'flex',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(0.5),
            },
            margin: '12px 0'
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
          },
          selectEmpty: {
            marginTop: theme.spacing(2),
          },
          MLTag: {
              color: 'white'
          }
    })
);