<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\Comment;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class CommentFixtures extends Fixture implements DependentFixtureInterface
{

    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');


        for ($k = 0; $k < 500; $k++) {
            $comment = new Comment();
            $comment->setComment($faker->sentence())
                ->setUser($this->getReference('user' . rand(0, 9)))
                ->setCreatedAt($faker->dateTimeBetween('-1 years'))
                ->setPost($this->getReference("post" . rand(0, 90)));
            $this->addReference("comment" . $k, $comment);
            $manager->persist($comment);
        }
        $manager->flush();
    }

    public function getDependencies()
    {
        return array(
            UserFixtures::class,
            PostFixtures::class
        );
    }
}
