import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import Delete from '@material-ui/icons/Delete'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import RedditIcon from '@material-ui/icons/Reddit'
import LanguageIcon from '@material-ui/icons/Language'


const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}))

const Game = props => {
    const classes = useStyles()
    const [expanded, setExpanded] = React.useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {props.name.slice(0, 1)}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings" onClick={() => props.actions.deleteGame(props.id)}>
                        <Delete />
                    </IconButton>
                }
                title={props.name}
                subheader={`rating: ${props.rating} / ${props.rating_top}`}
            />
            <CardMedia
                className={classes.media}
                image={props.background_image}
                title={props.name}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {
                        props.description_raw.length <= 180 ?
                            props.description_raw :
                            props.description_raw.slice(0, 180).trim() + '...'
                    }
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                {
                    props.reddit_url ?
                    <IconButton
                        aria-label={props.reddit_name || 'reddit'}
                        onClick={() => window.open(props.reddit_url)}>
                        <RedditIcon />
                    </IconButton>
                    : ''
                }
                {
                    props.website ?
                        <IconButton
                            aria-label={props.slug}
                            onClick={() => window.open(props.website)}>
                            <LanguageIcon />
                        </IconButton>
                        : ''
                }
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>{props.description_raw}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}

export default Game