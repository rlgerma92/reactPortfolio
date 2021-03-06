import React, { useState } from "react";
import { graphql } from "gatsby";
import styled, { css } from "styled-components";
import { Flex, Box } from "rebass";
import ScrollAnimation from "react-animate-on-scroll";
import Technologies from "../components/Technologies";
import ContactForm from "../components/ContactForm";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import HeroText from "../components/HeroText";
import Portfolio from "../components/Portfolio";
import { Button, Row, Col } from "antd";
import media from "../utils/style";

const Section = styled.div`
  text-align: center;
  padding: 0.5em 0.5em 2em;

  ${(props) =>
    props.dark &&
    css`
      background: #141018;
      h2 {
        color: #fff;
      }
      h3 {
        color: #fff;
      }
      div {
        color: #979797;
      }
    `};
`;

const SectionTitle = styled.h2`
  font-size: 2em;
  font-family: "name";
  font-weight: 700;
  margin: 2em 0;
  align-content: left;
  ${media.xs`
    font-size:1.5em;
  `}
`;

const IndexPage = ({ data }) => {
  const [portView, setPortView] = useState(data.allPortfolioJson.edges);
  const [portClass, setPortClass] = useState(
    "animate__animated animate__fadeInUp"
  );
  return (
    <Layout>
      <Hero>
        <HeroText />
      </Hero>

      <Section id='about-me'>
        <ScrollAnimation
          animateIn='fadeInDown'
          animateOnce
          initiallyVisible={false}
        >
          <SectionTitle>About Me</SectionTitle>
        </ScrollAnimation>

        <ScrollAnimation
          animateIn='fadeIn'
          animateOnce
          delay={1000}
          initiallyVisible={false}
        >
          <h5 style={{ fontSize: "1.0125rem", textAlign: "center" }}>
            <Row gutter={16}>
              <Col lg={16} sm={24} style={{ margin: ".3rem auto" }}>
                My name is{" "}
                <span style={{ fontWeight: "600" }}>Richard Germaine</span> and
                I'm a Developer from Denver.
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={16} sm={24} style={{ margin: ".3rem auto" }}>
                Whether you need minor styling on a web page,
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={16} sm={24} style={{ margin: ".3rem auto" }}>
                or the next breakout app, I can help you with your project
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={16} sm={20} style={{ margin: ".3rem auto" }}>
                using modern developing technologies and design.
              </Col>
            </Row>
          </h5>
        </ScrollAnimation>
      </Section>
      <Section id='portfolio' dark>
        <ScrollAnimation
          animateIn='fadeIn'
          animateOnce
          offset={200}
          initiallyVisible={false}
        >
          <SectionTitle>My Work</SectionTitle>
        </ScrollAnimation>
        <ScrollAnimation
          duration={2}
          animateIn='fadeIn'
          animateOnce
          offset={200}
          initiallyVisible={false}
        >
          <Button
            className='port-btn'
            onClick={() => {
              setPortClass("animate__animated animate__fadeInLeft");
              setPortView(data.allClientJson.edges);
            }}
          >
            Client Work
          </Button>

          <Button
            className='port-btn'
            onClick={() => {
              setPortClass("animate__animated animate__fadeInUp");
              setPortView(data.allPortfolioJson.edges);
            }}
          >
            Web Apps
          </Button>

          <Button
            className='port-btn'
            onClick={() => {
              setPortClass("animate__animated animate__fadeInRight");
              setPortView(data.allMobileJson.edges);
            }}
          >
            Mobile Apps
          </Button>
        </ScrollAnimation>

        <div className={portClass}>
          <Portfolio edges={portView} />
        </div>
      </Section>

      <Section id='technologies'>
        <SectionTitle>
          <ScrollAnimation
            animateIn='fadeInDown'
            animateOnce
            offset={200}
            initiallyVisible={false}
          >
            Technologies
          </ScrollAnimation>
        </SectionTitle>
        <ScrollAnimation
          animateIn='fadeInUp'
          animateOnce
          offset={200}
          initiallyVisible={false}
        >
          <Technologies edges={data.allLogos.edges} />
        </ScrollAnimation>
      </Section>
      <Section id='contact' dark>
        <SectionTitle>
          <ScrollAnimation
            duration={1}
            animateIn='FadeInDown'
            animateOnce
            initiallyVisible={false}
          >
            Contact Me
          </ScrollAnimation>
        </SectionTitle>
        <Flex alignItems='center' flexDirection='column'>
          <Box px={2} width={[1, 1 / 2]}>
            <ContactForm />
          </Box>
        </Flex>
      </Section>
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query indexQuery {
    allPortfolioJson {
      edges {
        node {
          about
          image
          id
          title
          url
          tech
        }
      }
    }
    allMobileJson {
      edges {
        node {
          about
          image
          id
          title
          tech
          url
        }
      }
    }

    allClientJson {
      edges {
        node {
          about
          image
          id
          title
          tech
          url
        }
      }
    }

    allPortfolio: allImageSharp(
      filter: { original: { src: { regex: "/port/" } } }
      sort: { fields: original___src }
    ) {
      edges {
        node {
          id
          fixed(grayscale: false) {
            ...GatsbyImageSharpFixed_tracedSVG
          }
        }
      }
    }

    allLogos: allImageSharp(
      filter: { original: { src: { regex: "/logo/" } } }
      sort: { fields: original___src }
    ) {
      edges {
        node {
          id
          fixed(height: 90, grayscale: false) {
            ...GatsbyImageSharpFixed_tracedSVG
          }
        }
      }
    }
    hero: allImageSharp(
      filter: { original: { src: { regex: "/background/" } } }
    ) {
      edges {
        node {
          id
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }
`;
