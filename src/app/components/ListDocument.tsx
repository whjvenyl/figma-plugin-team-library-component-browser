import * as React from 'react'
import ListPage from '@/app/components/ListPage'
import { inject, observer } from 'mobx-react'
import Store from '@/app/Store'

type Props = FigmaDocument & {
  store?: Store
}
type State = {
  isCollapsed: boolean
}

@inject('store')
@observer
export default class ListDocument extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      isCollapsed: this.props.isCollapsed
    }
  }

  clearComponentSelection(): void {
    if (this.props.store!.currentSelectComponentKey.length > 0) {
      this.props.store!.setCurrentSelectComponentKey('')
    }
  }

  toggleCollapse(): void {
    this.setState({ isCollapsed: !this.state.isCollapsed })
  }

  componentDidUpdate(): void {
    this.props.store!.resizeUI()
  }

  render(): JSX.Element {
    const { isCollapsed } = this.state

    return (
      <div
        className="document"
        onClick={this.clearComponentSelection.bind(this)}
      >
        <div
          className={`document-title ${isCollapsed ? 'is-collapsed' : ''}`}
          onClick={this.toggleCollapse.bind(this)}
        >
          <div className="document-title-icon">
            <span>.</span>
          </div>
          <div className="document-title-text">{this.props.name}</div>
        </div>
        <div className="document-pages">
          {this.props.pages.map(
            (page, index) =>
              page.components.length > 0 && (
                <ListPage
                  key={index}
                  name={page.name}
                  id={page.id}
                  components={page.components}
                  documentName={page.documentName}
                  isCollapsed={page.isCollapsed}
                />
              )
          )}
        </div>
      </div>
    )
  }
}
