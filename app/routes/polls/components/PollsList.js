// @flow

import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Content } from 'app/components/Content';
import NavigationTab, { NavigationLink } from 'app/components/NavigationTab';
import styles from './PollsList.css';
import Paginator from 'app/components/Paginator';
import Icon from 'app/components/Icon';
import LoadingIndicator from 'app/components/LoadingIndicator';
import { Flex } from 'app/components/Layout';
import { type PollEntity } from 'app/reducers/polls';
import { type ActionGrant } from 'app/models';

type Props = {
  polls: Array<PollEntity>,
  actionGrant: ActionGrant,
  fetching: boolean,
  hasMore: boolean,
  fetchAll: ({ next?: boolean }) => Promise<*>,
};

const PollsList = ({
  polls,
  actionGrant,
  fetchAll,
  hasMore,
  fetching,
}: Props) => (
  <Content>
    <Helmet title="Avstemninger" />
    <NavigationTab title="Avstemninger">
      {actionGrant.includes('create') && (
        <NavigationLink to="/polls/new">Lag ny</NavigationLink>
      )}
    </NavigationTab>
    <Paginator
      infiniteScroll={true}
      hasMore={hasMore}
      fetching={fetching}
      fetchNext={() => {
        fetchAll({
          next: true,
        });
      }}
    >
      <section className={styles.pollsList}>
        {polls.map((poll) => (
          <Link
            key={poll.id}
            to={`/polls/${poll.id}`}
            className={styles.pollItem}
          >
            <div className={styles.pollListItem}>
              <Flex>
                <Icon name="stats-chart" size={35} className={styles.icon} />
                <h3 className={styles.heading}>{poll.title}</h3>
              </Flex>

              <Flex wrap justifyContent="space-between">
                <span>{`Antall stemmer: ${poll.totalVotes}`}</span>
                <Flex alignItems="center" gap={2}>
                  {poll.hasAnswered ? (
                    <>
                      Svart
                      <Icon
                        name="checkmark-circle-outline"
                        size={20}
                        style={{ color: 'var(--color-green-4)' }}
                      />
                    </>
                  ) : (
                    <>
                      Ikke svart
                      <Icon
                        name="close-circle-outline"
                        size={20}
                        style={{
                          color: 'var(--lego-link-color)',
                        }}
                      />
                    </>
                  )}
                </Flex>
              </Flex>
            </div>
          </Link>
        ))}
      </section>
    </Paginator>
    <LoadingIndicator loading={fetching} />
  </Content>
);

export default PollsList;
