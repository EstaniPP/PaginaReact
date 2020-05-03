import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import backImage from './4045.jpg'
import { Base64 } from 'js-base64';

/*const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));*/

const sections = [
  { title: 'Todos', func: (posts)=>{return posts.filter(post => true)}, titleToShow:'Todos los resultados' },
  { title: 'ID<10', func: (posts)=>{return posts.filter(post => post.key < 10)}, titleToShow:'Todos los resultados con ID menor a 10' },
  { title: 'ID>10', func: (posts)=>{return posts.filter(post => post.key > 10)}, titleToShow:'Todos los resultados con ID mayor a 10' }/*,
  { title: 'Culture', url: '#' },
  { title: 'Business', url: '#' },
  { title: 'Politics', url: '#' },
  { title: 'Opinion', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Style', url: '#' },
  { title: 'Travel', url: '#' },*/
];

const mainFeaturedPost = {
  title: 'Pagina de wods en casa',
  description:
    "Esta es una pagina de prueba hecha para ver como funca una pagina subida a un hosting que trae los wods de una base de datos en otro hosting.",
  image: backImage,
  imgText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = []
/*  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
];*/

let sidebar = {
  title: 'About',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon, url:"https://github.com/EstaniPP"},
    { name: 'Twitter', icon: TwitterIcon, url:"https://twitter.com/EstaniPerezPena" },
    { name: 'LinkedIn', icon: LinkedInIcon, url:"https://www.linkedin.com/in/estanislao-perez-pe%C3%B1a-4b4393185/" },
  ],
};

export default class Blog extends Component {

  state = {
    posts : [],
    postsToShow : [],
    results: 'Se muestran todos los resultados',
    description: ''
  }

  filterPost = (func, results)=> {
    const postsToShow = func(this.state.posts)
    this.setState({postsToShow: postsToShow})
    this.setState({results: results})
  }
  async componentDidMount(){
      const res = await fetch('https://jsonplaceholder.typicode.com/posts')
      const data = await res.json();
      this.setState({posts: data.map((e) => { return {key: e.id, body: "".concat("#",e.title," ",e.body)} })})
      this.setState({postsToShow: data.map((e) => { return {key: e.id, body: "".concat("#",e.title," ",e.body)} })})

      const aboutRes = await fetch('https://api.github.com/repos/EstaniPP/PaginaReact/readme')
      const aboutData = await aboutRes.json();
      const aboutFinal = Base64.decode(aboutData.content)
      this.setState({description: aboutFinal});
  }


  render(){

  return (
    <React.Fragment >
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="EntrenaEnCasita" sections={sections} set={this.filterPost}/>
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5}>
            <Main title={this.state.results} posts={this.state.postsToShow} />
            <Sidebar
              title={sidebar.title}
              description={this.state.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer title="Footer" description="Something here to give the footer a purpose!" />
    </React.Fragment>
  );
  }
}