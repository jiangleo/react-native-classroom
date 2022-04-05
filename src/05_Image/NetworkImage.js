import React from 'react'
import {
    Image,
    Text,
    View
} from 'react-native'

export default class NetworkImage extends React.Component {
  state = {
    events: [],
    startLoadPrefetched: false,
    mountTime: Date.now(),
    imageHash: Date.now(),
    delayShow: false
  };

  UNSAFE_componentWillMount() {
    this.setState({ mountTime: Date.now() });
  }
  componentDidMount() {
    this.setState({ startLoadPrefetched: true }, () => {
      const { mountTime } = this.state;

      prefetchTask.then(
        () => {
          this._loadEventFired(
            `✔ Prefetch OK (+${Date.now() - mountTime}ms)`,
          );
          Image.queryCache([IMAGE_PREFETCH_URL]).then(map => {
            const result = map[IMAGE_PREFETCH_URL];
            if (result) {
              this._loadEventFired(
                `✔ queryCache "${result}" (+${Date.now() -
                mountTime}ms)`,
              );
            } else {
              this._loadEventFired(
                `✘ queryCache (+${Date.now() - mountTime}ms)`,
              );
            }
          });
        },
        error => {
          this._loadEventFired(
            `✘ Prefetch failed (+${Date.now() - mountTime}ms)`,
          );
        },
      );
    });

    setTimeout(() => {
      this.setState({ delayShow: true });

    }, 2000)

  }

  _loadEventFired = (event: string) => {
    this.setState(state => ({
      events: [...state.events, event],
    }));
  };

  updateLoadingImageHash = () => {
    this.setState({ imageHash: Date.now() });
  };

  render() {
    const { mountTime } = this.state;

    if (!this.state.delayShow) return null

    return (
      <View>
        <Image
          source={this.props.source}
          style={[styles.base, { overflow: 'visible' }]}
          onLoadStart={() =>
            this._loadEventFired(`✔ onLoadStart (+${Date.now() - mountTime}ms)`)
          }
          onProgress={event => {
            const { loaded, total } = event.nativeEvent;
            const percent = Math.round((loaded / total) * 100);
            this._loadEventFired(
              `✔ onProgress ${percent}% (+${Date.now() - mountTime}ms)`,
            );
          }}
          onLoad={event => {
            if (event.nativeEvent.source) {
              const url = event.nativeEvent.source.uri;
              this._loadEventFired(
                `✔ onLoad (+${Date.now() - mountTime}ms) for URL ${url}`,
              );
            } else {
              this._loadEventFired(`✔ onLoad (+${Date.now() - mountTime}ms)`);
            }
          }}
          onLoadEnd={() => {
            this._loadEventFired(`✔ onLoadEnd (+${Date.now() - mountTime}ms)`);

          }}
        />
        {this.state.startLoadPrefetched ? (
          <Image
            source={this.props.prefetchedSource}
            style={[styles.base, { overflow: 'visible' }]}
            onLoadStart={() =>
              this._loadEventFired(
                `✔ (prefetched) onLoadStart (+${Date.now() - mountTime}ms)`,
              )
            }
            onLoad={event => {
              // Currently this image source feature is only available on iOS.
              if (event.nativeEvent.source) {
                const url = event.nativeEvent.source.uri;
                this._loadEventFired(
                  `✔ (prefetched) onLoad (+${Date.now() -
                  mountTime}ms) for URL ${url}`,
                );
              } else {
                this._loadEventFired(
                  `✔ (prefetched) onLoad (+${Date.now() - mountTime}ms)`,
                );
              }
            }}
            onLoadEnd={() =>
              this._loadEventFired(
                `✔ (prefetched) onLoadEnd (+${Date.now() - mountTime}ms)`,
              )
            }
          />
        ) : null}
        
        <Text style={{ marginTop: 20 }}>{this.state.events.join('\n')}</Text>
      </View>
    );
  }
}
