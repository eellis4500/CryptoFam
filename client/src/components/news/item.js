function Item({ item }) {
    const separateWords = s => s.replace(/[A-Z][a-z]+/g, '$& ').trim();
    const formatDate = s => new Date(s).toLocaleDateString(undefined, { dateStyle: 'long' });
    return (
      <li className="item">
        {item.image &&
          <img className="thumbnail"
            alt=""
            src={item.image?.thumbnail?.contentUrl}
          />
        }
        <h2 className="title">
          <a href={item.url}>{item.name}</a>
        </h2>
        <p className="description">
          {item.description}
        </p>
        <div className="meta">
          <span>{formatDate(item.datePublished)}</span>
          <span className="provider">
            {item.provider[0].image?.thumbnail &&
              <img className="provider-thumbnail"
                alt=""
                src={item.provider[0].image.thumbnail.contentUrl + '&w=16&h=16'}
              />
            }
            {item.provider[0].name}
          </span>
          {item.category &&
            <span>{separateWords(item.category)}</span>
          }
        </div>
      </li>
    );
  }
