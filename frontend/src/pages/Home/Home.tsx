import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Image,
  message,
  Row,
  Space,
  Spin,
  Typography,
} from 'antd';
import {
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillGithub,
} from 'react-icons/ai';
import { CgWebsite } from 'react-icons/cg';
import { SiGmail } from 'react-icons/si';
import { User } from "../../types/User";

const SocialCards: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/users`);
      const data: User[] = await response.json();
      setUsers(data ?? []);
    } catch (error) {
      console.error(error);
      message.error('Error while fetching users!');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <Row gutter={[32, 32]}>
      {users.map((user, index) => (
        <Col md={8} lg={8} sm={24} xs={24} key={`${user.id}_${index}`}>
          <Card className="social_card">
            <Space
              className="social_card_space"
              direction="vertical"
              align="center"
            >
              <Image
                className="social_image"
                preview={false}
                src={
                  user.avatar_url ??
                  `${import.meta.env.VITE_AVATAR_API}?name=${user.username}&background=1890ff&color=fff`
                }
              />
              <Typography.Title level={5}>{user.username}</Typography.Title>
              <Typography.Paragraph>{user.about}</Typography.Paragraph>
              <Space size={16} wrap>
                {user.twitter_username && (
                  <Button
                    className="social_button twitter"
                    href={`https://twitter.com/${user.twitter_username}`}
                    type="link"
                    target="_blank"
                  >
                    <AiFillTwitterCircle size={24} />
                  </Button>
                )}
                {user.linkedin_username && (
                  <Button
                    className="social_button linkedin"
                    href={`https://www.linkedin.com/in/${user.linkedin_username}`}
                    type="link"
                    target="_blank"
                  >
                    <AiFillLinkedin size={24} />
                  </Button>
                )}
                {user.github_username && (
                  <Button
                    className="social_button github"
                    href={`https://github.com/${user.github_username}`}
                    type="link"
                    target="_blank"
                  >
                    <AiFillGithub size={24} />
                  </Button>
                )}
                {user.website_url && (
                  <Button
                    className="social_button website"
                    href={user.website_url}
                    type="link"
                    target="_blank"
                  >
                    <CgWebsite size={24} />
                  </Button>
                )}
                {user.email && (
                  <Button
                    className="social_button gmail"
                    href={`mailto:${user.email}`}
                    type="link"
                    target="_blank"
                  >
                    <SiGmail size={24} />
                  </Button>
                )}
              </Space>
            </Space>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default SocialCards;
