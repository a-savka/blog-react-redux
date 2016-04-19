import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  getGroupClass(field) {
    return `form-group ${ field.touched && field.invalid ? 'has-danger' : '' }`;
  }

  onSubmit(fields) {
    this.props.createPost(fields)
      .then(() => {
        this.context.router.push('/')
      })
  }

  render() {

    const {fields: {title, categories, content}, handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Creae A Blog Post</h3>

        <div className={this.getGroupClass(title)}>
          <label>Title</label>
          <input type="text" className="form-control" {...title}/>
          <div className="text-help">
            {title.touched ? title.error : ''}
          </div>
        </div>

        <div className={this.getGroupClass(categories)}>
          <label>Categories</label>
          <input type="text" className="form-control" {...categories}/>
          <div className="text-help">
            {categories.touched ? categories.error : ''}
          </div>
        </div>

        <div className={this.getGroupClass(content)}>
          <label>Content</label>
          <textarea className="form-control" {...content}/>
          <div className='text-help'>
            {content.touched ? content.error : ''}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Back</Link>

      </form>
    );
  }

}


function validate(values) {
  let errors = {};

  if(!values.title) {
    errors.title = "Please enter a post title";
  }
  if(!values.categories) {
    errors.categories = "Please enter categories";
  }
  if(!values.content) {
    errors.content = "Please enter content";
  }

  return errors;
}


export default reduxForm({
  form: "PostsNewForm",
  fields: ['title', 'categories', 'content'],
  validate
}, null, { createPost })(PostsNew);
