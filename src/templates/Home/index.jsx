import { Component } from 'react';

import './styles.css';

//Component
import { Posts } from '../../components/Posts'
import { loadPosts } from '../../utils/load-post'
import { Button } from '../../components/ButtonNextPage/index.jsx';
import Input from '../../components/TextInput';

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 50,
    searchValue: '',
  }

  async componentDidMount() {
    const { page, postsPerPage } = this.state
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    })
  }

  handleInput = ({ target }) => {
    this.setState({ searchValue: target.value })
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state

    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts)
    this.setState({ posts, page: nextPage })
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state
    const noMorePosts = page + postsPerPage >= allPosts.length

    const filteredPosts = !!searchValue ?
      allPosts.filter(p => {
        return p.title.toLowerCase().includes(
          searchValue.toLowerCase()
        );
      })
      : posts;

    return (
      <section className="container">
        <div className="search-container">
          <Input
            value={searchValue}
            handleChange={this.handleInput}
          />
        </div>
        {filteredPosts.length
          ? <Posts posts={filteredPosts} />
          : <h1>Nenhum post encontrado :(</h1>
        }

        <div className="button-container">
          {!searchValue &&
            <Button
              disabled={noMorePosts}
              onClick={this.loadMorePosts}>
              Load More
            </Button>
          }
        </div>
      </section>
    )
  }
}

export default Home;